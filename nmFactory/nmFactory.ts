import * as Nightmare from 'nightmare'

export let nightmare = new Nightmare({
    show:true,
    openDevTools:{
        mode:"detach"
    }
})