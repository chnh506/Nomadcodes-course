import 'package:flutter/material.dart';
import 'package:nomadcoders_toonflix/screens/home_screen_toonflix.dart';

void main() {
  runApp(App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: HomeScreenToonflix(),
    );
  }
}
