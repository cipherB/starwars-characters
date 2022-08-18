import { useState, useEffect } from 'react';
import { BsFilter } from 'react-icons/bs';

const Characters = ({characterList}) => {
  const [characters, setCharacters] = useState(characterList)
  const [filter, setFilter] = useState([])
  const [filterDropdown, setFilterDropdown] = useState(false)
  const [sort, setSort] = useState('')

  // if filter state changes, filter the list of characters based on gender
  useEffect(() => {
    if(filter.length > 0) {
      console.log("dfdeyy", filter)
      setCharacters(characterList.filter(item => filter.includes(item.gender)))
    } else {
      setCharacters(characterList)
    }
    console.log("dqeqq", characters)
  },[filter])

  // sorts the list based on the sort state
  switch(sort) {
    case 'name':
      characters.sort((a, b) => {
        let nameA = a.name.toLowerCase(), 
        nameB = b.name.toLowerCase()

        if (nameA < nameB) {
          return -1;
        }
        if (nameB > nameA) {
          return 1;
        }
        return 0;
      })
    break;
    case 'height':
      characters.sort((a, b) => {
        if (a.height === "unknown") {
          return 0 - b.height;
        }
        if (b.height === "unknown"){
          return a.height - 0;
        }
        return a.height - b.height;
      })
    default:
      break;
  }

  const filterOptions = [
    {label:'Male',value:'male'},
    {label:'Female',value:'female'},
    {label:'Hermaphrodite',value:'hermaphrodite'},
    {label:'Bot',value:'n/a'}
  ]

  // get initial letter of genders
  const getInitialLetter = (gender) => {
    return gender[0].toUpperCase()
  }

  // handles filter selection once double clicked
  const handleOnChange = (value) => {
    if (filter.includes(value)) {
      setFilter(filter.filter(item => item !== value))
    } else {
      setFilter(filter => filter.concat(value))
    }
  }

  // get the sum of height of all visible characters in cm, ft, in
  const sumOfHeights = () => {
    let sum = 0;
    characters.map(item => item.height === "unknown" ? sum +=  0 : sum += parseInt(item.height))
    let feet = (parseInt(sum / 30.48))
    let inch = parseFloat((sum / 2.54) - (feet * 12)).toFixed(2)
    return `${sum} cm (${feet}ft/${inch}in)`
  }

  return (
    <div className='table-contain' >
      <div id='filter-contain' >
        <button onClick={() => setFilterDropdown(!filterDropdown)}>
          Filter
          <BsFilter />
        </button>
        <div style={{
            visibility:filterDropdown ? "visible" : "hidden",
            opacity: filterDropdown ? 100 : 0,
            transform: filterDropdown ? "translateY(0)" : "translateY(-20px)",
          }}
          id="dropdown"
        >
          <ul id='filter'>
            {
              filterOptions.map(({label, value},key) => (
                <li>
                  <input 
                    type="checkbox"
                    name={label}
                    value={value}
                    onChange={() => handleOnChange(value)}
                  />
                  <label htmlFor={label}>{label}</label>
                </li>
              ))
            }
          </ul>
        </div>
        {filterDropdown && <div id='closeDropdown' onClick={() => setFilterDropdown(false)} ></div>}
      </div>
      <table className='table' >
        <thead>
          <tr className='table-header-row' >
            <th align='left' onDoubleClick={()=>setSort('name')} >
              <p className='table-header' >Name</p>
            </th>
            <th align='left' onDoubleClick={()=>setSort('gender')} >
              <p className='table-header' >Gender</p>
            </th>
            <th align='left' onDoubleClick={()=>setSort('height')} >
              <p className='table-header' >Height</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            characters.map((item, id) => (
              <tr key={id} className="table-row" >
                <td align='left' >
                  <p className='table-data'>{item.name}</p>
                </td>
                <td align='left' >
                  <p className='table-data' >{getInitialLetter(item.gender)}</p> 
                </td>
                <td align='left' >
                  <p className='table-data' >{item.height}</p> 
                </td>
              </tr>
            )) 
          }
          <tr className='table-header-row'>
            <th className='table-header'>Total characters</th>
            <th className='table-header'>Total height</th>
            <th></th>
          </tr>
          <tr className="table-row">
            <td className='table-data'>{characters.length}</td>
            <td className='table-data'>{sumOfHeights()}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Characters