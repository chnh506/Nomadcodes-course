import 'package:flutter/material.dart';
import 'package:nomadcoders_toonflix/screens/home_screen_toonflix.dart';
import 'package:nomadcoders_toonflix/services/api_service.dart';

void main() {
  ApiService().getTodaysToons();
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
