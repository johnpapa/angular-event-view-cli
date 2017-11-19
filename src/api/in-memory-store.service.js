'use strict';
var InMemoryStoreService = (function() {
  function InMemoryStoreService() {}
  /**
   * Creates fresh copy of data each time.
   * Safe for consuming service to morph arrays and objects.
   */
  InMemoryStoreService.prototype.createDb = function() {
    var speakers = [
      {
        id: 11,
        name: 'Chewbacca',
        twitter: '@im_chewy'
      },
      {
        id: 12,
        name: 'Rey',
        twitter: '@rey'
      },
      {
        id: 13,
        name: 'Finn (FN2187)',
        twitter: '@finn'
      },
      {
        id: 14,
        name: 'Han Solo',
        twitter: '@i_know'
      },
      {
        id: 15,
        name: 'Leia Organa',
        twitter: '@organa'
      },
      {
        id: 16,
        name: 'Luke Skywalker',
        twitter: '@chosen_one_son'
      },
      {
        id: 17,
        name: 'Poe Dameron',
        twitter: '@i_am_poe'
      },
      {
        id: 18,
        name: 'Kylo Ren',
        twitter: '@daddy_issues'
      },
      {
        id: 19,
        name: 'Supreme Commander Snoke',
        twitter: '@snoker'
      },
      {
        id: 20,
        name: 'R2-D2',
        twitter: '@r2d2'
      },
      {
        id: 21,
        name: 'BB8',
        twitter: '@bb_eight'
      },
      {
        id: 22,
        name: 'C-3PO',
        twitter: '@goldy'
      },
      {
        id: 23,
        name: 'Maz Kanata',
        twitter: '@mazzzy'
      },
      {
        id: 24,
        name: 'Captain Phasma',
        twitter: '@fazma'
      },
      {
        id: 25,
        name: 'General Hux',
        twitter: '@hux'
      },
      {
        id: 26,
        name: 'Lor San Tekka',
        twitter: '@lor_san'
      }
    ];
    var sessions = [
      {
        id: 130,
        name: 'Angular 2 First Look',
        level: 'beginner'
      },
      {
        id: 132,
        name: 'RxJS',
        level: 'beginner'
      },
      {
        id: 133,
        name: 'Angular Material',
        level: 'beginner'
      },
      {
        id: 134,
        name: 'Redux',
        level: 'beginner'
      },
      {
        id: 135,
        name: 'React',
        level: 'beginner'
      },
      {
        id: 136,
        name: 'TypeScript',
        level: 'beginner'
      },
      {
        id: 137,
        name: 'ES2015',
        level: 'beginner'
      },
      {
        id: 138,
        name: 'Mongo',
        level: 'beginner'
      },
      {
        id: 139,
        name: 'Redis',
        level: 'beginner'
      },
      {
        id: 140,
        name: 'Node',
        level: 'beginner'
      },
      {
        id: 141,
        name: 'Express',
        level: 'beginner'
      }
    ];
    var rooms = [
      {
        id: 30,
        name: 'Millennium Falcon',
        type: 'space'
      },
      {
        id: 32,
        name: 'X-Wing Fighter',
        type: 'space'
      },
      {
        id: 33,
        name: 'Imperial Star Destroyer',
        type: 'space'
      },
      {
        id: 34,
        name: 'AT-AT Walker',
        type: 'land'
      },
      {
        id: 35,
        name: 'TIE Fighter',
        type: 'space'
      },
      {
        id: 36,
        name: 'B-Wing Fighter',
        type: 'space'
      },
      {
        id: 37,
        name: 'ETA-2 Jedi Starfighter',
        type: 'space'
      },
      {
        id: 38,
        name: 'TIE Interceptor',
        type: 'space'
      },
      {
        id: 39,
        name: 'X-34 Landspeeder',
        type: 'land'
      },
      {
        id: 40,
        name: 'Snow Speeder',
        type: 'land'
      },
      {
        id: 41,
        name: 'X-34 Landspeeder',
        type: 'land'
      }
    ];
    return { rooms: rooms, speakers: speakers, sessions: sessions };
  };
  return InMemoryStoreService;
})();
exports.InMemoryStoreService = InMemoryStoreService;
//# sourceMappingURL=in-memory-store.service.js.map
