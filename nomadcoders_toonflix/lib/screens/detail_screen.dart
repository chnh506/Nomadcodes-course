import 'package:flutter/material.dart';
import 'package:nomadcoders_toonflix/models/webtoon_detail_model.dart';
import 'package:nomadcoders_toonflix/models/webtoon_episode_model.dart';
import 'package:nomadcoders_toonflix/services/api_service.dart';

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

  @override
  void initState() {
    // initState() 메서드에서 webtoonDetail을 초기화한다.
    // data는 StatefulWidget인 DetailScreen로 전달된다.
    // widget.id를 통해 State에서 id를 참조한다.
    super.initState();
    webtoonDetail = ApiService.getToonById(widget.id);
    episodes = ApiService.getLatestEpisodesById(widget.id);
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
      ),
      body: Column(
        children: [
          SizedBox(
            height: 50,
          ),
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
                  child: Image.network(widget.thumb, headers: const {
                    "User-Agent":
                        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
                  }),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
