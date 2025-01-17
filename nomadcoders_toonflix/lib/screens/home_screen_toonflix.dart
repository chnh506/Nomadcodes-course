import 'package:flutter/material.dart';
import 'package:nomadcoders_toonflix/models/webtoon_model.dart';
import 'package:nomadcoders_toonflix/services/api_service.dart';

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
            return ListView.separated(
              itemBuilder: (context, index) {
                print(index);
                var webtoon = snapshot.data![index];
                return Text(webtoon.title);
              },
              separatorBuilder: (context, index) => SizedBox(width: 20),
              itemCount: snapshot.data!.length,
              scrollDirection: Axis.horizontal,
            );
          }
          return Center(
            child: CircularProgressIndicator(),
          );
        },
      ),
    );
  }
}
