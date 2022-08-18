import load from '../assets/darthvader.gif'

const Loader = () => {
  return (
    <div>
      <div style={{width:"100%",height:"100%",paddingBottom:"5em",position:"relative"}}>
        <img src={load} alt="vader" id="load" />
      </div>
    </div>
  )
}

export default Loader