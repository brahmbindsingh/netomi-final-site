import React, { useEffect } from 'react'

const Home = (props) => {
  useEffect(()=>{
    
  }, [props.submitted])
  return (
    <>
      <iframe
        name="myframe"
        src="http://localhost:3000/form"
        width={"340px"}
        height={"700px"}
      >
      </iframe>
      {console.log(props)}
      <div>
        { props.submitted && Object.keys(props.formErrors).length===0 && ( <div>{`Result: {"Success": "All fields are valid"}`}</div> )}
        { props.submitted && Object.keys(props.formErrors).length!==0 &&
            Object.keys(props.formErrors).map((el, index)=>{
            return <div key={index}>Result: {`"${el}": "${JSON.stringify(props.formErrors[el])}"`}</div>
            })
        }
      </div>
    </>
  )
}

export default Home