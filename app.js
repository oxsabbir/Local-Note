const submit = document.querySelector('.submit')
const cancel = document.querySelector('.cancel')
const title = document.querySelector('.title')
const mainNote = document.querySelector('#noteArea')
const addNote = document.querySelector('.addNoteButton')
const editNote = document.querySelector('.edit')
const deleteNote = document.querySelector('.del')
const rightPart = document.querySelector('.right-side')
const newNoteSlide = document.querySelector('.new-notes')
const righSideContent = document.querySelector('.full-right-side')
const noteDisplay = document.querySelector('.note-display')
const rightHead = document.querySelector('.right-head')
const sideBar = document.querySelector('.everynote')
const editing = document.querySelector('.forEdit')
const backBtn = document.querySelector('.backbtn')
let data = 1
let runningIndex = 0
// time 
const h3 = document.querySelector('.noteHeading')


const date = new Date
const time = `${date.getDate().toString().padStart(2,0)}/${date.getMonth().toString().padStart(2,0)}/${date.getFullYear()}`

// responsive back


// Main note

let allNotes = [
    {
        name : 'Bring it down',
        date : '27/03/23',
        note : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, sapiente illo dolor nostrum consectetur dolorem debitis natus corporis, nobis',
        data : 6
    },
    {
        name : 'Nobody Does it Better',
        date : '27/03/23',
        note : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, sapiente illo dolor nostrum consectetur dolorem debitis natus corporis, nobis',
        data : 5
    },{
        name : 'Doc is my fav',
        date : '27/03/23',
        note : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, sapiente illo dolor nostrum consectetur dolorem debitis natus corporis, nobis',
        data : 4
    },
    {
        name : 'RPG is now Shit',
        date : '27/03/23',
        note : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, sapiente illo dolor nostrum consectetur dolorem debitis natus corporis, nobis',
        data : 3
    },
    {
        name : 'React Vs Node',
        date : '27/03/23',
        note : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, sapiente illo dolor nostrum consectetur dolorem debitis natus corporis, nobis',
        data : 2
    },{
        name : 'Battle Royale',
        date : '27/03/23',
        note : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, sapiente illo dolor nostrum consectetur dolorem debitis natus corporis, nobis',
        data : 1
    }   
]

// setting local storage 
const updateNote = function() {
    localStorage.setItem('allnote',JSON.stringify(allNotes))
}



let newData = allNotes.length
// Add Note


addNote.addEventListener('click', function () {
    console.log("helo")
    h3.classList.add('hidden')
    noteDisplay.style.display = 'none'
    rightPart.classList.add('hidden')
    newNoteSlide.classList.remove('hidden')
})

// cancel 
const cancels = function () {
    rightPart.classList.remove('hidden')
    newNoteSlide.classList.add('hidden')
    h3.classList.remove('hidden')
    noteDisplay.style.display = 'inline-block'
}
cancel.addEventListener('click', cancels)

// saving new notes 

submit.addEventListener('click', function() {
    h3.classList.remove('hidden')

    allNotes.push(
        {
            name : title.value,
            date : time,
            note : mainNote.value,
            data : newData+1
        }
    )
    title.value = ''
    mainNote.value = ''
    showNoteSidebar()
    cancels()
    newData = newData + 1
    showBigScreen(allNotes[newData-1])

    updateNote()
})

// showing allNote on the side bar

const showNoteSidebar = function () {

   


    sideBar.innerHTML = ''
    allNotes.forEach(notes => {
        const markUp = `
        <div class="pages" data-id="${notes.data}">
        <div class="details" >
            <div class="head">
            <p class="date">${notes.date}</p>
            <h4>${notes.name.slice(0,23)}</h4>
        </div>
            <p class="notes">${notes.note.slice(0,100)}
        </p>
    </div>
    </div>
    `
    sideBar.insertAdjacentHTML('afterbegin',markUp)
    })

   
}

showNoteSidebar()
// display note to the big screen


// responsive test 

const restest = function () {
    if(screen.availWidth <= 480) {
        return true
    } else  {
        return false
    }
}


const clickBack = function () {
    console.log('clicked')
    noteDisplay.style.display = 'inline-block'
    backBtn.style.display = 'none'
    h3.classList.remove('hidden')
    rightPart.style.display = 'none'

}


backBtn.addEventListener('click', clickBack)


const showBigScreen = function (note) {

    // responsive
    if(restest()) {
        console.log('responsive start')
        backBtn.style.display = 'inline'
        noteDisplay.style.display = 'none'
        rightPart.style.display = 'inline-block'
        h3.classList.add('hidden')
        rightHead.classList.add('hidden')
    }

    righSideContent.classList.remove('hidden')

    const markUp = `
    <div class="content-btn">
    <div class="button-area">
        <p class="name">${note.name}</p>
        <p class="time">${note.date}</p>
        <div class="allbutton">

            <button class="button edit">Edit</button>
            <button class="button del">Del</button>
        </div>
    </div>
</div>

<div class="content-area ">
    <div class="content">${note.note}
    </div>
</div>
    `
    righSideContent.innerHTML = ''
    righSideContent.insertAdjacentHTML('afterbegin', markUp)
}

// showBigScreen(allNotes[0])

// handling side bar

// getting data id for edit note

let selectedData = 0

sideBar.addEventListener('click', function(e) {

    // Responsive
    const dataValue = +e.target.dataset.id
    allNotes.find(notes => {
        if(notes.data === dataValue) {
            
            showBigScreen(notes)
            runningIndex = allNotes.findIndex(note => note === notes)
            selectedData = notes.data
            console.log(notes)
            console.log(runningIndex)
        }
    })
})

// delete feature 

righSideContent.addEventListener('click', function (e) {
    if(e.target.classList.contains('del')) {
        console.log('delete')
        allNotes.splice(runningIndex,1)
        showNoteSidebar()
        righSideContent.innerHTML = ''
        updateNote()
        clickBack()
    }

// edit features 
    if(e.target.classList.contains('edit')) {
        console.log(editNote)
        // editNote.style.display = 'none'
        const notes = allNotes[runningIndex]
        console.log(notes)
        righSideContent.classList.add('hidden')

        const markUp = ` 
        <div class="content-btn">
           <div class="button-area">
            <p class="name"><input class="editName" type="text" placeholder="Title" value="${notes.name}"></p>
            <p class="time"></p>
            <div class="allbutton">
                
                <button class="button edit">Edit</button>
            <button class="button del saveEdit">Save</button>
        </div>
           </div>
        </div>

        <div class="content-area ">
     <div class="content">

        <textarea name="content" id="" cols="20" rows="10" class="editContent">${notes.note}
        </textarea>
    </div>
</div>`
        // righSideContent.innerHTML = ''

        editing.insertAdjacentHTML('afterbegin',markUp)
        console.log(editing)

        const saveEdit = document.querySelector('.saveEdit')
        
        saveEdit.addEventListener('click', function() {
        righSideContent.classList.remove('hidden')

            const title = document.querySelector('.editName')
            const note = document.querySelector('.editContent')

            const new0bj =  {
                name : title.value,
                date : time,
                note : note.value,
                data : selectedData
            }

            console.log(title.value,note.value)
            allNotes.splice(runningIndex,1)
            allNotes.push(new0bj)
            updateNote()
            console.log('hide')
            editing.innerHTML = ''
            console.log(notes)
            showNoteSidebar()
            console.log(runningIndex)
            showBigScreen(allNotes[runningIndex])
            showNoteSidebar()
        })
    }

})





// getting data from localstorage 

window.addEventListener('load', function() {
    if(Boolean(localStorage.getItem('allnote'))) {
        const note = JSON.parse(localStorage.getItem('allnote'))
        allNotes = note
        newData = note.length
        showNoteSidebar()
    }
})



