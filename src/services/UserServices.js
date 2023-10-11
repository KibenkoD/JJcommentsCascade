userService.service("userService", ["$q","$timeout","$http", function ($q, $timeout, $http) {
    const nameList = [
        'Time', 'Past', 'Future', 'Dev',
        'Fly', 'Flying', 'Soar', 'Soaring', 'Power', 'Falling',
        'Fall', 'Jump', 'Cliff', 'Mountain', 'Rend', 'Red', 'Blue',
        'Green', 'Yellow', 'Gold', 'Demon', 'Demonic', 'Panda', 'Cat',
        'Kitty', 'Kitten', 'Zero', 'Memory', 'Trooper', 'XX', 'Bandit',
        'Fear', 'Light', 'Glow', 'Tread', 'Deep', 'Deeper', 'Deepest',
        'Mine', 'Your', 'Worst', 'Enemy', 'Hostile', 'Force', 'Video',
        'Game', 'Donkey', 'Mule', 'Colt', 'Cult', 'Cultist', 'Magnum',
        'Gun', 'Assault', 'Recon', 'Trap', 'Trapper', 'Redeem', 'Code',
        'Script', 'Writer', 'Near', 'Close', 'Open', 'Cube', 'Circle',
        'Geo', 'Genome', 'Germ', 'Spaz', 'Shot', 'Echo', 'Beta', 'Alpha',
        'Gamma', 'Omega', 'Seal', 'Squid', 'Money', 'Cash', 'Lord', 'King',
        'Duke', 'Rest', 'Fire', 'Flame', 'Morrow', 'Break', 'Breaker', 'Numb',
        'Ice', 'Cold', 'Rotten', 'Sick', 'Sickly', 'Janitor', 'Camel', 'Rooster',
        'Sand', 'Desert', 'Dessert', 'Hurdle', 'Racer', 'Eraser', 'Erase', 'Big',
        'Small', 'Short', 'Tall', 'Sith', 'Bounty', 'Hunter', 'Cracked', 'Broken',
        'Sad', 'Happy', 'Joy', 'Joyful', 'Crimson', 'Destiny', 'Deceit', 'Lies',
        'Lie', 'Honest', 'Destined', 'Bloxxer', 'Hawk', 'Eagle', 'Hawker', 'Walker',
        'Zombie', 'Sarge', 'Capt', 'Captain', 'Punch', 'One', 'Two', 'Uno', 'Slice',
        'Slash', 'Melt', 'Melted', 'Melting', 'Fell', 'Wolf', 'Hound',
        'Legacy', 'Sharp', 'Dead', 'Mew', 'Chuckle', 'Bubba', 'Bubble', 'Sandwich', 'Smasher',
        'Extreme', 'Multi', 'Universe', 'Ultimate', 'Death', 'Ready', 'Monkey', 'Elevator', 'Wrench',
        'Grease', 'Head', 'Theme', 'Grand', 'Cool', 'Kid', 'Boy', 'Girl', 'Vortex', 'Paradox'
    ];
    const createRandomNickname = function (){
        return nameList[Math.floor(Math.random() * nameList.length)]
    }
    const createRandomText = function (length) {
        let result = '';
        const characters = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    return {
       liveJUsers: [
           {
               userId: 1,
               userNickName: createRandomNickname(Math.floor(Math.random() * 100)),
               threadId: 1,
               commentId: 1,
               text: createRandomText(15),
               timeCreated: new Date ().toUTCString(),
               onModerate: false,
               avatarImage: 'https://l-userpic.livejournal.com/125710104/77221898'
           },
           {
               userId: 2,
               userNickName: createRandomNickname(Math.floor(Math.random() * 100)),
               threadId: 1,
               commentId: 2,
               text: createRandomText(20),
               timeCreated: new Date ().toUTCString(),
               onModerate: false,
               avatarImage: 'https://l-userpic.livejournal.com/127911055/78161184'
           },
           {
               userId: 3,
               userNickName: createRandomNickname(Math.floor(Math.random() * 100)),
               threadId: 2,
               commentId: 3,
               text: createRandomText(25),
               timeCreated: new Date ().toUTCString(),
               onModerate: false,
               avatarImage: 'https://l-userpic.livejournal.com/126778384/39059446'
           },
           {
               userId: 4,
               userNickName: createRandomNickname(Math.floor(Math.random() * 100)),
               threadId: 2,
               commentId: 4,
               text: createRandomText(30),
               timeCreated: new Date ().toUTCString(),
               onModerate: false,
               avatarImage: 'https://l-userpic.livejournal.com/128989531/85692950'
           },
           {
               userId: 5,
               userNickName: createRandomNickname(Math.floor(Math.random() * 100)),
               threadId: 3,
               commentId: 5,
               text: createRandomText(35),
               timeCreated: new Date ().toUTCString(),
               onModerate: false,
               avatarImage: 'https://l-userpic.livejournal.com/125710104/77221898'
           }
       ],
       userCommentsData: {
           userId: null,
           userNickName:null,
           threadId: null,
           commentId: null,
           text: null,
           timeCreated: null,
           onModerate: null,
           avatarImage: null,
       },
       RequestGET: function (method, data, config) {
            return $http.get(method, data, config);
       },
       setUserData: function (){
           let this_ = this;
       },
        getUserData: function (){
            let this_ = this;

        },
        fakePromise: function (timingDebounce){
           return $q.when(
               $timeout(()=>{console.log('fakePromise timingDebounce', timingDebounce)}, timingDebounce)
           )
        },
        initCurrentUser: function (user){
            let this_ = this;
            Object.assign(this_.userCommentsData, user)
        }
    }
}]);
