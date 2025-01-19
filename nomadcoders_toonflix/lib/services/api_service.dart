import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:nomadcoders_toonflix/models/webtoon_detail_model.dart';
import 'package:nomadcoders_toonflix/models/webtoon_episode_model.dart';
import 'package:nomadcoders_toonflix/models/webtoon_model.dart';

class ApiService {
  static const String baseUrl =
      "https://webtoon-crawler.nomadcoders.workers.dev";
  static const String today = "today";

  static Future<List<WebtoonModel>> getTodaysToons() async {
    List<WebtoonModel> webtoonInstances = [];
    final uri = Uri.parse("$baseUrl/$today");
    final response = await http.get(uri);
    if (response.statusCode == 200) {
      final List<dynamic> webtoons = jsonDecode(response.body);
      for (var webtoon in webtoons) {
        final instance = WebtoonModel.fromJson(webtoon);
        webtoonInstances.add(instance);
      }

      return webtoonInstances;
    } else {
      throw Error();
    }
  }

  static Future<WebtoonDetailModel> getToonById(String id) async {
    final uri = Uri.parse("$baseUrl/$id");
    final response = await http.get(uri);
    if (response.statusCode == 200) {
      final Map<String, dynamic> webtoon = jsonDecode(response
          .body); // Parses the string and returns the resulting Json object.
      return WebtoonDetailModel.fromJson(
          webtoon); // Returns a new instance of WebtoonDetailModel.
    } else {
      throw Error();
    }
  }

  static Future<List<WebtoonEpisodeModel>> getLatestEpisodesById(
      String id) async {
    List<WebtoonEpisodeModel> episodesInstances = [];
    final uri = Uri.parse("$baseUrl/$id/episodes");
    final response = await http.get(uri);
    if (response.statusCode == 200) {
      final List<dynamic> episodes = jsonDecode(response.body);
      for (var episode in episodes) {
        episodesInstances.add(WebtoonEpisodeModel.fromJson(episode));
      }
      return episodesInstances;
    } else {
      throw Error();
    }
  }
}
