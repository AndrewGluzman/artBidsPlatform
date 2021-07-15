import React, { useEffect, useState } from 'react'
import '../../App.css'

function BottomTabs(props) {
  const [toggleState, setToggleState] = useState(1)
  const [bid, setBids] = useState([])

  useEffect(() => {
    console.log(props.bids)

    setBids(props.bids)
  }, [props])

  const toggleTab = (index) => {
    setToggleState(index)
  }

  const bidDate = (someDate) => {
    var date = new Date(someDate) // Now

    return date
  }

  return (
    <div className="container">
      <div className="bloc-tabs mt-lg-5">
        <button
          className={toggleState === 1 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(1)}
        >
          DESCRIPTION
        </button>
        <button
          className={toggleState === 2 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(2)}
        >
          AUCTION HISTORY
        </button>
        <button
          className={toggleState === 3 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(3)}
        >
          ARTIST INFO
        </button>
        <button
          className={toggleState === 4 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(4)}
        >
          ARTIST WORKS
        </button>
      </div>

      <div className="content-tabs text-secondary">
        <div
          className={toggleState === 1 ? 'content  active-content' : 'content'}
        >
          <h2>Van Goh Painting</h2>
          <hr />
          <p>
            Going forward knowledge is power or we need to button up our
            approach old boys club. Please use “solutionise” instead of solution
            ideas! 🙂 draw a line in the sand, for take five, punch the tree,
            and come back in here with a clear head. Out of scope data-point
            work flows , nor critical mass, and time to open the kimono yet move
            the needle. You better eat a reality sandwich before you walk back
            in that boardroom fire up your browser, so come up with something
            buzzworthy, for it’s about managing expectations yet baseline into
            the weeds. Gain traction product management breakout fastworks we
            just need to put these last issues to bed, or table the discussion .
          </p>
        </div>

        <div
          className={
            toggleState === 2 ? 'content px-md-0  active-content' : 'content'
          }
        >
          <table className="table table-hover table-borderless text-secondary py-0 ">
            <thead>
              <tr>
                <th className="border-1 border-bottom-0" scope="col">
                  #
                </th>
                <th className="border-1 border-bottom-0" scope="col">
                  Date
                </th>
                <th className="border-1 border-bottom-0" scope="col">
                  Price
                </th>
                <th className="border-1 border-bottom-0" scope="col">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="border-1">
              {bid
                .slice(0)
                .reverse()
                .map((bidItem, i) => {
                  return (
                    <tr>
                      <th scope="row">{bid.length - i}</th>
                      <td>{bidDate(bidItem.date_created).toLocaleString()}</td>
                      <td className="tw-bolder fs-6">
                        ${bidItem.price.toFixed(2)}
                      </td>
                      <td>{bidItem.email}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>

        <div
          className={toggleState === 3 ? 'content  active-content' : 'content'}
        >
          <h2>Content 3</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sed
            nostrum rerum laudantium totam unde adipisci incidunt modi alias!
            Accusamus in quia odit aspernatur provident et ad vel distinctio
            recusandae totam quidem repudiandae omnis veritatis nostrum
            laboriosam architecto optio rem, dignissimos voluptatum beatae
            aperiam voluptatem atque. Beatae rerum dolores sunt.
          </p>
        </div>
        <div
          className={toggleState === 4 ? 'content  active-content' : 'content'}
        >
          <h2>Content 2</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            voluptatum qui adipisci.
          </p>
        </div>
      </div>
    </div>
  )
}

export default BottomTabs
