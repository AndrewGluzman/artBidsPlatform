import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { doApiGet, URL_API } from '../../services/apiSer'
import CartSide from './cartSide'
import Header from './header'
// import ProdBox from '../client/images/dev1.jpg'

function About(props) {
  let [search, setSearch] = useState('')
  let [prods_ar, setProdsAr] = useState([])
  // ישמש בשביל לדעת אם להציג את הלואדינג או לא
  let [loadingShow, setLoadingShow] = useState(true)

  useEffect(() => {
    // בשביל לאסוף קווארי סטרינג בצד לקוח
    let urlParams = new URLSearchParams(window.location.search)
    //?q=koko
    setLoadingShow(true)
    setSearch(urlParams.get('q'))
    doApiSearch(urlParams.get('q'))
    // props.location -> ככה שאם אנחנו כבר בחיפוש אז הוא יתרנדר מחדש
  }, [props.location])

  const doApiSearch = async (_searchFor) => {
    let url = URL_API + '/prods/search?q=' + _searchFor
    let data = await doApiGet(url)
    setProdsAr(data)
    setLoadingShow(false)
    console.log(data)
  }

  return (
    <React.Fragment>
      <CartSide />
      <div className="container-xxl">
        <div className="breadcrumb">
          <Link className="breadcrumb-item text-secondary" to="/">
            Home/
          </Link>
        </div>
        <h1 className="h3 fw-bolder mb-2"></h1>
        <div class="hero"></div>

        <div class="col mt-5  span-8">
          <div className="">
            <div class="col-lg-8 mx-auto mt-5">
              <h1
                className=" gap5rem fw-bolder"
                style={{ textAlign: 'center', whiteSpace: 'pre-wrap' }}
              >
                Coming onboard means joining the family
              </h1>
              <p
                style={{ textAlign: 'center', whiteSpace: 'pre-wrap' }}
                className="mt-5"
              >
                $4Art its a bids platform based on latest technology. We partner
                with our photographers to offer targeted marketing and
                consulting support to ensure their work and brands get the
                exposure they deserve. Because, let's face it, no one is going
                to hire you if they don't know you exist.
              </p>
              <p
                style={{ textAlign: 'center', whiteSpace: 'pre-wrap' }}
                className="mb-5"
              >
                Our House was established by creatives for creatives. We know
                more than anyone that no talented artist deserves to starve and
                so we're offering a seat at the table. Call it comfort food,
                cheerleading, brand management, marketing support, an extra set
                of eyes, a photo editor, a photo therapist, a rep, a valuable
                member of your team, or simply someone you can be professionally
                honest with—<em>we are something different</em>&nbsp;to each and
                every one of the photographers we work with. And that's exactly
                the way we like it. In this industry, it's all about making
                impressions on the right people at the right time, and with the
                right content. We're here to help you do that in any way needed.
              </p>
            </div>
          </div>
          <div className="mx-auto text-center my-5 gap6rem">
            <p>MEET</p>
            <h1 className="motive_color fw-bolder">The Team</h1>
          </div>
          <div className="mt-5 d-flex row">
            <div className="col-4  mb-4 overflow-cover">
              <div className="devops_img">
                <img
                  className="img-fluid"
                  src={URL_API + '/prods_images/dev6.jpg'}
                ></img>
              </div>
              <div>
                <h3 className="mt-4">HENRY GLUZMAN</h3>
                <h4 className="motive_color">COOL PROGRAMMER & NICE GUY</h4>
                <br />
                <p>
                  He actualy build this Platform, as a final project in his
                  studies. This project build to serve artists who wants to sell
                  their works but yet found an affordable way to do that. This
                  project based on following technolpgies: JavaScript as a main
                  programming language, ReactJS as a front-end framework, NodeJS
                  for back-end and MongoDb as data-base. If you have any
                  questions feel free to contact him
                  <a
                    href="mailto:insanie232@gmail.com"
                    target="_blank"
                    onclick="window.open('your WS URL');"
                  >
                    <span> here.</span>
                  </a>
                </p>
              </div>
            </div>
            <div className="col-4 mb-4 overflow-cover">
              <div className="devops_img">
                <img
                  className="img-fluid"
                  src={URL_API + '/prods_images/dev1.jpg'}
                ></img>
              </div>
              <div>
                <h3 className="mt-4">STACY SMIVESHSKY</h3>
                <h4 className="motive_color">CREATIVE CONSULTANT</h4>
                <br />
                <p>
                  Stacy is a Philadelphia based Creative Consultant with an
                  extensive background in commercial photography, education and
                  consulting. She's worked with hundreds of photographers from
                  all parts of the globe during her time in the industry. She
                  holds an MPS in Digital Photography from The School of Visual
                  Arts and a BFA in Photography from Parsons School of Design.
                </p>
              </div>
            </div>
            <div className="col-4 mb-4 overflow-cover">
              <div className="devops_img">
                <img
                  className="img-fluid"
                  src={URL_API + '/prods_images/dev4.jpg'}
                ></img>
              </div>
              <div>
                <h3 className="mt-4">COLBY WALLIE</h3>
                <h4 className="motive_color">GRAPHIC DESIGNER</h4>
                <br />
                <p>
                  Colby is an experienced Art Director and Graphic Designer.
                  He’s honed his branding, logo design, illustration and
                  typography skills working with clients from photographers,
                  non-profit organizations, higher education, and everything in
                  between. Colby holds a BS in Graphic Design with a minor in
                  photography from Pennsylvania College of Technology.
                </p>
              </div>
            </div>
            <div className="col-4 mb-4 overflow-cover">
              <div className="devops_img">
                <img
                  className="img-fluid"
                  src={URL_API + '/prods_images/dev3.jpg'}
                ></img>
              </div>
              <div>
                <h3 className="mt-4">ALLIE SOMMER</h3>
                <h4 className="motive_color">MOTIVATOR</h4>
                <br />
                <p>
                  Allie has been working in the photography industry for over 8
                  years, honing her vision and her skills as both a
                  photographer/photographer's assistant for clients in the
                  hospitality, architecture, and education industry. After
                  working closely with Stacy Swiderski as her Assistant Photo
                  Editor at Stacy Swiderski Consulting, Allie has been
                  instrumental in the development and launch of Philly Reps. She
                  works with photographers on creative coaching, portfolio
                  builds and project development.
                </p>
              </div>
            </div>
            <div className="col-4 mb-4 overflow-cover">
              <div className="devops_img">
                <img
                  className="img-fluid"
                  src={URL_API + '/prods_images/dev2.jpg'}
                ></img>
              </div>
              <div>
                <h3 className="mt-4">MONICA ADLER</h3>
                <h4 className="motive_color">PRODUCTION + ESTIMATING</h4>
                <br />
                <p>
                  Monica is a swiss army knife of production. He’s a versatile
                  asset to any photographers team, able to help with everything
                  from assisting, to producing a shoot, to writing and reviewing
                  estimates, and everything in-between. If you need an assistant
                  with a bit of production help, someone to set up catering and
                  pull permits, or someone to coordinate with clients and
                  produce a shoot he’d be happy to work with you.
                </p>
              </div>
            </div>
            <div className="col-4 mb-4 overflow-cover">
              <div className="devops_img">
                <img
                  className="img-fluid"
                  src={URL_API + '/prods_images/dev5.jpg'}
                ></img>
              </div>
              <div>
                <h3 className="mt-4">CAL MAHLUF</h3>
                <h4 className="motive_color">GAL ALUF'S - VIRTUAL TWIN</h4>
                <br />
                <p>
                  Cal is just some guy that looks like Gal Aluf research
                  specialist and an integral part of the work that's done behind
                  the scenes at Philly Reps. Whether building a list,
                  researching client prospects, digging through databases, or
                  making agency calls on behalf of our photographers, her role
                  is the backbone of our brand. Prior to joining our team, she
                  honed her skills in the commercial insurance industry.
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className="mb-5" />
      </div>
    </React.Fragment>
  )
}

export default About
