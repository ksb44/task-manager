import React from 'react';
const randomNamesArray = Array.from({ length: 50 }, (item,index)=>{
    return `Name ${index+1}`;
  });
function Pagination() {

        const [currentPage,setCurrentPage]=useState(1)
        const itemPerPage =10
        const totalNoPages = randomNamesArray.length /itemPerPage
        const lastIndex = currentPage * itemPerPage
        const firstIndex = lastIndex - itemPerPage
        const currentItems = randomNamesArray.slice(firstIndex,lastIndex)
      
        const handlePrev =()=>{
          setCurrentPage(currentPage-1)
        }
        const handleNext =()=>{
          setCurrentPage(currentPage+1)
          }
          return (
              <div>
              {currentItems.map((item)=>(
                <div key={item}>{item}</div>
              ))}
      
              <button disabled={currentPage ===1} onClick={handlePrev}>
                prev
              </button>
              <button disabled={currentPage == totalNoPages} onClick={handleNext}>
                next
              </button>
              </div>
              
          )
      }

export default Pagination;