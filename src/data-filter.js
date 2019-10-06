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
    console.log(timeTable)
    return timeTable
}

const dataFilter = (date = new Date()) => {
    // date for debugging
    date = new Date(2019, 10, 4, 10, 45, 0, 0)

    const timeTable = getTimeTable()
    let filteredTimeTable = {}

    const dayTable = {
        1: 'Mo',
        2: 'Tu',
        3: 'We',
        4: 'Th',
        5: 'Fr'
    }

    for (let roomname in timeTable) {
        filteredTimeTable[roomname] = timeTable[roomname]
            .filter(time => time.includes(dayTable[date.getDay()]))
            .map(v => v.slice(v.length - 17))
            .map(v => {
                let [fst, sec] = v.split(' - ')
                fst = fst.replace(':', '')
                sec = sec.replace(':', '')
                if (fst.includes('AM')) {
                    fst = fst.replace('AM', '')
                } else {
                    fst = fst.replace('PM', '')
                    if (parseInt(fst) < 1200) {
                        fst = parseInt(fst) + 1200
                    }
                }
                if (sec.includes('AM')) {
                    sec = sec.replace('AM', '')
                } else {
                    sec = sec.replace('PM', '')
                    if (parseInt(sec) < 1200) {
                        sec = parseInt(sec) + 1200
                    }
                }
                return `${fst} ${sec}`
            })
    }

    console.log(filteredTimeTable)

    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    const now = `${hour}${minute}`

    const classroomList = []
    for (let roomname in filteredTimeTable) {
        let free = true
        for (let i = 0; i < filteredTimeTable[roomname].length; i++) {
            let session = filteredTimeTable[roomname][i]
            if (now >= session.split(' ')[0] && now <= session.split(' ')[1]) {
                free = false
            }
        }
        if (free) {
            let until = 'End of Today'
            filteredTimeTable[roomname].forEach(v => {
                let start = v.split(' ')[0]
                if (start > now) {
                    until = `${start.slice(0, 2)}:${start.slice(2)}`
                    return
                }
            })
            classroomList.push({ room: roomname, free: true, until })
        } else {
            classroomList.push({ room: roomname, free: false })
        }
    }
    return classroomList
}

export { dataFilter, getTimeTable }