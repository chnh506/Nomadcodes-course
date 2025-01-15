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

class _AppState extends State<App> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        textTheme: TextTheme(
          titleLarge: TextStyle(
            color: Colors.red,
          ),
        ),
      ),
      home: Scaffold(
        backgroundColor: const Color(0xFFF4EDDB),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              MyLargeTitle(),
            ],
          ),
        ),
      ),
    );
  }
}

class MyLargeTitle extends StatefulWidget {
  const MyLargeTitle({
    super.key,
  });

  @override
  State<MyLargeTitle> createState() => _MyLargeTitleState();
}

class _MyLargeTitleState extends State<MyLargeTitle> {
  @override
  void initState() {
    // state를 초기화하기 위한 메서드
    // 기존에 했던 방법에서 봤듯이, 이 메서드를 꼭 사용해야 하는 것은 아니다.
    // 다만, 종종 부모 요소에 의존하는 데이터를 초기화해야 하는 경우가 있다.
    // 중요한 점은 항상 initState 메서드가 build 메서드보다 먼저 호출되어야 한다.
    super.initState();
    print('initState!');
  }

  @override
  void dispose() {
    // TODO: implement dispose
    super.dispose();
    print('dispose!');
  }

  @override
  Widget build(BuildContext context) {
    print('build!');
    return Text(
      'My Large Title',
      style: TextStyle(
        fontSize: 30,
        color: Theme.of(context).textTheme.titleLarge?.color,
      ),
    );
  }
}
