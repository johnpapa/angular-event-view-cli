import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryStoreService implements InMemoryDbService {
  /**
   * Creates fresh copy of data each time.
   * Safe for consuming service to morph arrays and objects.
   */
  createDb() {
    const speakers = [
      {
        id: 11,
        name: 'Chewbacca',
        twitter: '@im_chewy',
        nextId: 12,
        prevId: null
      },
      {
        id: 12,
        name: 'Rey',
        twitter: '@rey',
        nextId: 13,
        prevId: 11
      },
      {
        id: 13,
        name: 'Finn ',
        twitter: '@finn',
        nextId: 14,
        prevId: 12
      },
      {
        id: 14,
        name: 'Han Solo',
        twitter: '@i_know',
        nextId: 15,
        prevId: 13
      },
      {
        id: 15,
        name: 'Leia Organa',
        twitter: '@organa',
        nextId: 16,
        prevId: 14
      },
      {
        id: 16,
        name: 'Luke Skywalker',
        twitter: '@chosen_one_son',
        nextId: 17,
        prevId: 15
      },
      {
        id: 17,
        name: 'Poe Dameron',
        twitter: '@i_am_poe',
        nextId: 18,
        prevId: 16
      },
      {
        id: 18,
        name: 'Kylo Ren',
        twitter: '@daddy_issues',
        nextId: 19,
        prevId: 17
      },
      {
        id: 19,
        name: 'Supreme Leader Snoke',
        twitter: '@snoker',
        nextId: 20,
        prevId: 18
      },
      {
        id: 20,
        name: 'R2-D2',
        twitter: '@r2d2',
        nextId: 21,
        prevId: 19
      },
      {
        id: 21,
        name: 'BB8',
        twitter: '@bb_eight',
        nextId: 22,
        prevId: 20
      },
      {
        id: 22,
        name: 'C-3PO',
        twitter: '@goldy',
        nextId: 23,
        prevId: 21
      },
      {
        id: 23,
        name: 'Maz Kanata',
        twitter: '@mazzzy',
        nextId: 24,
        prevId: 22
      },
      {
        id: 24,
        name: 'Captain Phasma',
        twitter: '@fazma',
        nextId: 25,
        prevId: 23
      },
      {
        id: 25,
        name: 'General Hux',
        twitter: '@hux',
        nextId: 26,
        prevId: 24
      },
      {
        id: 26,
        name: 'Lor San Tekka',
        twitter: '@lor_san',
        nextId: null,
        prevId: 25
      }
    ];

    const sessions = [
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

    const rooms = [
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

    return { rooms, speakers, sessions };
  }
}
