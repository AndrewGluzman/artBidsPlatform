import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { doApiGet, URL_API } from '../../services/apiSer';
import CartSide from './cartSide';
import Header from './header';
import ProdBox from './prodBox';

function HomeSearch(props) {
  let [search, setSearch] = useState("")
  let [prods_ar, setProdsAr] = useState([]);
  // ישמש בשביל לדעת אם להציג את הלואדינג או לא
  let [loadingShow,setLoadingShow] = useState(true)

  useEffect(() => {
    // בשביל לאסוף קווארי סטרינג בצד לקוח
    let urlParams = new URLSearchParams(window.location.search);
    //?q=koko
    setLoadingShow(true);
    setSearch(urlParams.get('q'))
    doApiSearch(urlParams.get('q'));
    // props.location -> ככה שאם אנחנו כבר בחיפוש אז הוא יתרנדר מחדש
  }, [props.location])

  const doApiSearch = async (_searchFor) => {
    let url = URL_API + "/prods/search?q=" + _searchFor;
    let data = await doApiGet(url);
    setProdsAr(data);
    setLoadingShow(false);
    console.log(data);
  }

  return (
    <React.Fragment>
      <Header />
      <CartSide />
      <div className="container">
        <hr className="for_h2" />
        <h2 className="h2_hr">
          <span>
            Search for {search} :
            </span>
        </h2>
        {loadingShow && <div className="text-center"><img src="/images/loading.gif" /></div>}
         {/* במידה וסיים לקבל מידע והמערך הריק יציג הודעת אי מציאת מוצרים */}
        {!loadingShow && prods_ar.length==0 && <div className="text-center">Not found products...</div>}
        <div className="row mb-5">
          {prods_ar.map(item => {
            return (
              <ProdBox key={item._id} item={item} />
            )
          })}

        </div>
      </div>
    </React.Fragment>
  )
}

export default HomeSearch