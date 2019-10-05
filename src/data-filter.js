import Data from './DATA.json'

const getTimeTable = () => {
    let timeTable = {}
    Data.forEach(data => {
        if (data.room in timeTable) {
            timeTable[data.room].push(data.time)
        } else {
            timeTable[data.room] = [data.time]
        }
    })
    let size = 0
    for(let key in timeTable){
        size++
    }
    console.log(size)
    return timeTable
}

const dataFilter = (date = new Date()) => {
    const timeTable = getTimeTable()
    let filteredTimeTable = {}
    // console.log(timeTable)
    const dayTable = {
        1: 'Mo',
        2: 'Tu',
        3: 'We',
        4: 'Th',
        5: 'Fr'
    }
    for (let roomname in timeTable) {
        filteredTimeTable[roomname] = timeTable[roomname].filter(time => time.includes(dayTable[date.getDay()]))
            .map(v => v.slice(v.length - 17))
            .map(v => {
                let [fst, sec] = v.split(' - ')
                fst = fst.replace(':', '')
                sec = sec.replace(':', '')
                if (fst.includes('AM')) {
                    fst = fst.replace('AM', '')
                } else {
                    fst = fst.replace('PM', '')
                    fst = parseInt(fst) + 1200
                }
                if (sec.includes('AM')) {
                    sec = sec.replace('AM', '')
                } else {
                    sec = sec.replace('PM', '')
                    sec = parseInt(sec) + 1200
                }
                return `${fst} ${sec}`
            })
    }
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    const now = `${hour}${minute}`

    const freeClassroomList = []
    for (let roomname in filteredTimeTable) {
        let free = true
        for (let i = 0; i < filteredTimeTable[roomname].length; i++) {
            let session = filteredTimeTable[roomname][i]
            if (now >= session.split(' ')[0] && now <= session.split(' ')[1]) {
                free = false
            }
        }
        if (free) {
            freeClassroomList.push({ room: roomname, until: '13:30' })
        }
    }
    console.log(freeClassroomList)
    return freeClassroomList
}

export default dataFilter