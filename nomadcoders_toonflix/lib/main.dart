import 'package:flutter/material.dart';

void main() {
  runApp(const App());
}

class App extends StatelessWidget {
  const App({super.key});
  // StatelessWidget -> build() 메서드를 구현해야 한다.
  // build 메서드 -> 우리 widget의 UI를 만드는 것
  // flutter가 실행하게 될 메서드로, 이 메서드가 무엇을 return하던지 그것을 화면에 띄워줄 것이다.

  // 이 App Widget은 runApp() 메서드에 주는 위젯이다. -> 즉, 우리 앱의 root이다.
  // 모든 화면과 버튼 등등, 모든 것들이 App Widget으로부터 온다.

  @override // Dart annotation. 부모 클래스에 있는 것을 override한다.
  Widget build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(
      backgroundColor: Color(0xFF181818),
      body: Padding(
          padding: EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            children: [
              SizedBox(
                height: 80,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text(
                        'Hey, Selena',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 24,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                      Text(
                        'Welcome back',
                        style: TextStyle(
                          color: Colors.white.withAlpha(204),
                          fontSize: 16,
                        ),
                      ),
                    ],
                  )
                ],
              )
            ],
          )),
    ));
  }
}
