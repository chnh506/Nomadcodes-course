import 'package:flutter/material.dart';
import 'package:nomadcoders_toonflix/models/webtoon_detail_model.dart';
import 'package:nomadcoders_toonflix/models/webtoon_episode_model.dart';
import 'package:nomadcoders_toonflix/services/api_service.dart';
import 'package:nomadcoders_toonflix/widgets/episode_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';

class DetailScreen extends StatefulWidget {
  final String id, thumb, title;

  const DetailScreen({
    super.key,
    required this.id,
    required this.thumb,
    required this.title,
  });

  @override
  State<DetailScreen> createState() => _DetailScreenState();
}

class _DetailScreenState extends State<DetailScreen> {
  late Future<WebtoonDetailModel> webtoonDetail; // 나중에 정의할 것이라 선언해 둔다.
  late Future<List<WebtoonEpisodeModel>> episodes;
  late SharedPreferences prefs;
  bool isLiked = false;

  Future initPrefs() async {
    // 유저의 저장소에 connection을 만든다.
    prefs = await SharedPreferences.getInstance();
    final likedToons = prefs
        .getStringList('likedToons'); // return값은 List<String> 일 수도 있고 아닐 수도 있다.
    if (likedToons != null) {
      // likedToons 리스트가 존재할 때.
      // 지금 사용자가 보고 있는 웹툰의 id가 likedToons 리스트에 있는지 확인한다.
      if (likedToons.contains(widget.id) == true) {
        isLiked = true;
        setState(() {});
      }
    } else {
      // 앱을 맨 처음에 열었을 때. likedToons 리스트를 생성한다.
      await prefs.setStringList('likedToons', []);
    }
  }

  @override
  void initState() {
    // initState() 메서드에서 webtoonDetail을 초기화한다.
    // data는 StatefulWidget인 DetailScreen로 전달된다.
    // widget.id를 통해 State에서 id를 참조한다.
    super.initState();
    webtoonDetail = ApiService.getToonById(widget.id);
    episodes = ApiService.getLatestEpisodesById(widget.id);
    initPrefs();
  }

  onHeartTap() async {
    final likedToons = prefs.getStringList('likedToons');
    if (likedToons != null) {
      if (isLiked == true) {
        likedToons.remove(widget.id);
      } else {
        likedToons.add(widget.id);
      }

      await prefs.setStringList('likedToons', likedToons);
      setState(() {
        isLiked = !isLiked;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: Text(
          widget.title,
          style: TextStyle(
            fontSize: 24,
          ),
        ),
        elevation: 2,
        foregroundColor: Colors.green,
        backgroundColor: Colors.white,
        surfaceTintColor: Colors.white,
        shadowColor: Colors.black,
        actions: [
          IconButton(
            onPressed: onHeartTap,
            icon: Icon(
              isLiked == true
                  ? Icons.favorite
                  : Icons.favorite_outline_outlined,
            ),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: 40,
          vertical: 50,
        ),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Hero(
                  tag: widget.id,
                  child: Container(
                    width: 250,
                    clipBehavior: Clip.hardEdge,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(16),
                      boxShadow: [
                        BoxShadow(
                          blurRadius: 15,
                          offset: Offset(10, 10),
                          color: Colors.black.withAlpha(75),
                        ),
                      ],
                    ),
                    child: Image.network(
                      widget.thumb,
                      headers: const {
                        'Referer': 'https://comic.naver.com',
                      },
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(
              height: 20,
            ),
            FutureBuilder(
              future: webtoonDetail,
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        snapshot.data!.about,
                        style: TextStyle(
                          fontSize: 16,
                        ),
                      ),
                      const SizedBox(
                        height: 16,
                      ),
                      Text(
                        '${snapshot.data!.genre} / ${snapshot.data!.age}',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  );
                }
                return Text("Loading...");
              },
            ),
            SizedBox(
              height: 24,
            ),
            FutureBuilder(
              future: episodes,
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  return Expanded(
                    child: SingleChildScrollView(
                      child: Column(
                        children: [
                          for (var episode in snapshot.data!.length > 10
                              ? snapshot.data!.sublist(0, 10)
                              : snapshot.data!)
                            Episode(episode: episode, webtoonId: widget.id),
                        ],
                      ),
                    ),
                  );
                }
                return Container();
              },
            ),
          ],
        ),
      ),
    );
  }
}
