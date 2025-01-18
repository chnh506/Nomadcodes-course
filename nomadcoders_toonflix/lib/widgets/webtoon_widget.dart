import 'package:flutter/material.dart';
import 'package:nomadcoders_toonflix/models/webtoon_model.dart';

class Webtoon extends StatelessWidget {
  final WebtoonModel webtoon;
  const Webtoon({
    super.key,
    required this.webtoon,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
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
          child: Image.network(webtoon.thumb, headers: const {
            "User-Agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
          }),
        ),
        SizedBox(
          height: 10,
        ),
        Text(
          webtoon.title,
          style: TextStyle(
            fontSize: 20,
          ),
        ),
      ],
    );
  }
}
