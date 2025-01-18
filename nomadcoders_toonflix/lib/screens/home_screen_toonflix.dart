import 'package:flutter/material.dart';
import 'package:nomadcoders_toonflix/models/webtoon_model.dart';
import 'package:nomadcoders_toonflix/services/api_service.dart';
import 'package:nomadcoders_toonflix/widgets/webtoon_widget.dart';

class HomeScreenToonflix extends StatelessWidget {
  HomeScreenToonflix({super.key}); // 클래스 안에 Future를 넣었으므로, const 키워드를 빼야 한다.
  // const는 컴파일 전에 값을 알고 있다는 뜻.

  final Future<List<WebtoonModel>> webtoons = ApiService.getTodaysToons();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: Text(
          "Today's toons",
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
      body: FutureBuilder(
        future: webtoons,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return Column(
              children: [
                SizedBox(
                  height: 50,
                ),
                Expanded(
                  child: makeList(snapshot),
                ),
              ],
            );
          }
          return Center(
            child: CircularProgressIndicator(),
          );
        },
      ),
    );
  }

  ListView makeList(AsyncSnapshot<List<WebtoonModel>> snapshot) {
    return ListView.separated(
      padding: EdgeInsets.symmetric(
        vertical: 10,
        horizontal: 20,
      ),
      itemBuilder: (context, index) {
        var webtoon = snapshot.data![index];
        return Webtoon(
          webtoon: webtoon,
        );
      },
      separatorBuilder: (context, index) => SizedBox(width: 40),
      itemCount: snapshot.data!.length,
      scrollDirection: Axis.horizontal,
    );
  }
}
