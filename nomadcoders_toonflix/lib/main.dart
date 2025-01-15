import 'package:flutter/material.dart';

void main() {
  runApp(const App());
}

// 첫 번째 부분: 위젯 그 자체. 우리의 어플리케이션 클래스로 확장되었다.
// 매우 적은 양의 코드, State라고 불리는 것을 하나 가지고 있을 뿐이다.
class App extends StatefulWidget {
  const App({super.key});

  @override
  State<App> createState() => _AppState();
}

// 두 번째 부분: 여기 있는 State
// State는 우리가 UI를 구축하는 곳이고, 이 상태는 매우 특별하다.
// 우리가 데이터를 바꿀 때, UI는 새로고침되면서 최신 데이터를 보여준다.
// 데이터는 단순히 Dart의 클래스 프로퍼티일 뿐이다.
class _AppState extends State<App> {
  int counter = 0;

  // IconButton 위젯의 onPressed 프로퍼티에 등록할 함수(메서드)
  void onClicked() {
    counter = counter + 1;
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: const Color(0xFFF4EDDB),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Click Count',
                style: TextStyle(
                  fontSize: 30,
                ),
              ),
              Text(
                '$counter',
                style: TextStyle(
                  fontSize: 30,
                ),
              ),
              IconButton(
                iconSize: 40,
                onPressed: onClicked,
                icon: const Icon(
                  Icons.add_box_rounded,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
