import * as Nightmare from 'nightmare'

export let nightmare = new Nightmare({
    show:false,
    openDevTools:{
        mode:"detach"
    }
})