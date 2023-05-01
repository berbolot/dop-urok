import { useState, useEffect } from "react";


function CharacterInfo({ data }) {
  console.log(data);
  return (
    <div className="shopItem">
      <div className="name">{data.displayName}</div>
      <img src={data.displayAssets[0].background} />
    </div>
  );
}

function Container() {
  const [users, setData] = useState([]);
  const [renderer, setRender] = useState([]);
  const [noset, setNoset] = useState('')
  const [svalue, setValue] = useState('')

// console.log(renderer);
  useEffect(() => {
    fetch("https://fortniteapi.io/v2/shop?lang=en", {
      method: "GET",
      headers: {
        Authorization: "c7caefb8-30bd3e32-284b154a-1f820282",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.shop)
        setRender(data.shop)})
        .catch(() => {
          setNoset('no internet!!!')
        })
  }, []);

  // console.log(users);

  const search = (event) => {
    let newData = users.filter((el) => {
      if (
        el.displayName.trim().toLowerCase().includes(event.target.value.trim().toLowerCase()) 
      ) {
        return el;
      } 
    });
      
    setRender(newData);
    setValue(event.target.value)
  };

     const onClose = () => {
         setValue('')
     }
        

  return (
    <div>
      <h1 className="text">MY PROJECTS</h1>
      <input id="inn" type="text" placeholder="number" onChange={search} value={svalue}/>
      <button className="btn" onClick={onClose}>close</button>
     
      <div className="shopCont">
        {
        renderer.length ? (
          renderer.map((el) => {   
            return <CharacterInfo data={el} />
         
          })
       
        ) : ( 
          <p className="loading"> 
            <p style={{textAlign: 'center',width: '100%', fontSize: '50px', color: 'red'}}>{noset}</p> 
          </p>      
        )}
      </div>
    </div>
  );
}

export default Container;


