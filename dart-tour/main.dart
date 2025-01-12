typedef Word = Map<String, String>;

class Dictionary {
  List<Word> words = [];

  // add: 단어를 추가함.
  void add({required String term, required String definition}) {
    words.add({
      "term": term,
      "definition": definition,
    });
  }

  // get: 단어의 정의를 리턴함.
  String get(String term) {
    final word = words.firstWhere(
      (w) => w['term'] == term,
      orElse: () => {'term': '', 'definition': ''},
    );

    if (word['term']!.isEmpty) {
      throw Exception("단어가 존재하지 않습니다");
    }
    return word['definition']!;
  }

  // delete: 단어를 삭제함.
  void delete(String term) {
    words.removeWhere(
      (w) => w['term'] == term,
    );
  }

  // update: 단어를 업데이트 함.
  void update({required String term, required String definition}) {
    var idx = words.indexWhere((w) => w['term'] == term);
    words[idx]['definition'] = definition;
  }

  // showAll: 사전 단어를 모두 보여줌.
  void showAll() {
    print(words);
  }

  // count: 사전 단어들의 총 갯수를 리턴함.
  int count() {
    return words.length;
  }

  // upsert 단어를 업데이트 함. 존재하지 않을시. 이를 추가함. (update + insert = upsert)
  void upsert({required String term, required String definition}) {
    if (exists(term)) {
      update(term: term, definition: definition);
    } else {
      add(term: term, definition: definition);
    }
  }

  // exists: 해당 단어가 사전에 존재하는지 여부를 알려줌.
  bool exists(String term) {
    return words.any((word) => word['term'] == term);
  }

  // bulkAdd: 다음과 같은 방식으로. 여러개의 단어를 한번에 추가할 수 있게 해줌. [{"term":"김치", "definition":"대박이네~"}, {"term":"아파트", "definition":"비싸네~"}]
  void bulkAdd(List<Word> bulkWords) {
    words.addAll(bulkWords);
  }

  // bulkDelete: 다음과 같은 방식으로. 여러개의 단어를 한번에 삭제할 수 있게 해줌. ["김치", "아파트"]
  void bulkDelete(List<String> bulkTerms) {
    for (var term in bulkTerms) {
      delete(term);
    }
  }
}

void main() {
  var dict = Dictionary();
  dict.showAll();
  print(dict.count());
  print('');

  dict.add(term: "김치", definition: "맛있다");
  dict.showAll();
  print(dict.count());
  print(dict.get("김치"));
  print('');

  dict.add(term: "우승식당", definition: "제육볶음");
  dict.showAll();
  dict.update(term: "우승식당", definition: "제육볶음맛집");
  print(dict.get("우승식당"));

  dict.bulkAdd([
    {"term": "이공냉면", "definition": "태국볶음밥"},
    {"term": "이공김밥", "definition": "참치김밥"},
  ]);
  dict.showAll();
  print(dict.count());
  dict.bulkDelete(["김치", "이공냉면"]);
  dict.showAll();
  dict.delete("이공김밥");
  dict.showAll();
  print('');

  dict.upsert(term: "산적", definition: "우삼겹");
  dict.showAll();
  dict.upsert(term: "산적", definition: "삼겹살");
  dict.showAll();
  print(dict.exists("산적"));
  print(dict.exists("이공김밥"));
  print('');

  print('Test Completed!!');
}
