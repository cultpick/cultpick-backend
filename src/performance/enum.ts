export enum Genre {
  THEATER = 'THEATER', // 연극
  DANCE_WESTERN_KOREAN = 'DANCE_WESTERN_KOREAN', // 무용(서양/한국무용)
  DANCE_POPULAR = 'DANCE_POPULAR', // 대중무용
  MUSIC_WESTERN_CLASSICAL = 'MUSIC_WESTERN_CLASSICAL', // 서양음악(클래식)
  MUSIC_KOREAN_TRADITIONAL = 'MUSIC_KOREAN_TRADITIONAL', // 한국음악(국악)
  MUSIC_POPULAR = 'MUSIC_POPULAR', // 대중음악
  COMBINATION = 'COMBINATION', // 복합
  CIRCUS_MAGIC = 'CIRCUS_MAGIC', // 서커스/마술
  MUSICAL = 'MUSICAL', // 뮤지컬
}

export enum State {
  COMING = 'COMING', // 공연예정
  ONGOING = 'ONGOING', // 공연중
  END = 'END', // 공연완료
}
