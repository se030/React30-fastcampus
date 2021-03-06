import { atom } from "recoil"

/*
    {
        mon:[
            {
                start:
                end:
                name:
                color:

            }, {}, ...
        ]
        tue: [{}, {}, ...]
    }
*/

// Recoil atom-effects https://recoiljs.org/ko/docs/guides/atom-effects/
const localStorageEffect = key => ({setSelf, onSet}) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
        console.log(newValue, _, isReset);
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const timetableState = atom({
    key: "timetableState",
    default: {
        mon:[ {start:9, end:12, name:"SE", color:"#f4c2c2", id:1} ],
        tue: [ {start:10, end:13, name:"SE", color:"#a1caf1", id:2} ],
        wed: [ {start:15, end:17, name:"SE", color:"#fffacd", id:3} ],
        thur: [ {start:9, end:11, name:"SE", color:"#ccffe6", id:4} ],
        fri: [ {start:12, end:13, name:"SE", color:"#fb607f", id:5} ]
    },
    effects: [
        localStorageEffect('timeTable'),
    ]
})