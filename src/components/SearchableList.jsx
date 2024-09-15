import React, { useState } from 'react';
    const names = ["John", "Anna", "Peter", "Linda", "Tom",
        "Sara", "Mike", "Emma", "David", "Olivia",
        "William", "Ava", "James", "Isabella", "George",
        "Mia", "Robert", "Sophia", "Richard", "Mason",
        "Charlotte", "Charles", "Amelia", "Thomas", "Harper",
        "Ronald", "Evelyn", "Donald", "Abigail", "Harold"]
function SearchableList() {
    const [input,setInput]=useState('')
    const filter =names.filter((item)=>{
        return item.toLowerCase().includes(input.toLowerCase())
    })
    return (
        <div>
            <div>
                <input type="search" value={input} onChange={(e)=>setInput(e.target.value)}/>
            </div>
            <div style={{display:'flex',lineHeight:2,padding:1,margin:7,flexWrap:'wrap'}}>
                {filter.map((item)=>(
                    <div style={{margin:4}} key={item}>{item}</div>
                ))}
            </div>

        </div>
    )
}
export default SearchableList;