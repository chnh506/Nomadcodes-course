class WebtoonModel {
  final String title, thumb, id;

  // 무료 Dart 강의에서 배웠던 named constructor!
  // fromJson이라는 이름의 생성자를 만들어서 json을 파싱한다.
  WebtoonModel.fromJson(Map<String, dynamic> json)
      : title = json['title'],
        thumb = json['thumb'],
        id = json['id'];
}
