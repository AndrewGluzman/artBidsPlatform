import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { doApiGet, doApiMethod, URL_API } from '../../services/apiSer'
import { Link, useHistory } from 'react-router-dom'

function AddProd(props) {
  let [cat_ar, setCatAr] = useState([])

  let history = useHistory()
  const { register, handleSubmit, errors } = useForm()

  let fileRef = useRef()
  let nameRef = register({ required: true, minLength: 3 })
  let infoRef = register({ required: true, minLength: 3 })
  let descriptionRef = register({ required: true, minLength: 3 })
  let priceRef = register({ required: true, min: 1 })
  let imageRef = register({})
  let commentsRef = register({ minLength: 1 })
  let catRef = register({ required: true })

  useEffect(() => {
    doApiGetCat()
  }, [])

  // COLLECT category from db
  const doApiGetCat = async () => {
    let url = URL_API + '/categories'
    let data = await doApiGet(url)
    setCatAr(data)
  }

  const onFormSub = (dataBody) => {
    //copying price to starting bid
    dataBody.starting_bid = dataBody.price
    dataBody.qty = 1
    // doApi(dataBody)
    doApi(dataBody)
  }

  const doApi = async (dataBody) => {
    let url = URL_API + '/prods'
    let data = await doApiMethod(url, 'POST', dataBody)
    // if succed we will get _id prop
    // console.log(data);
    if (data._id) {
      if (fileRef.current.files.length > 0) {
        uploadFile(data._id)
      } else {
        alert('prod added')
        history.push('/profile/userProducts')
      }
    } else {
      alert('There is problem try again later')
    }
  }

  const uploadFile = async (_idProd) => {
    // ככה אוספים מידע מקובץ שרוצים לשלוח
    let editId = _idProd
    console.log(fileRef.current.files[0])
    // שיטה לשליחת מידע כגון קובץ
    const myData = new FormData()
    // fileSend -> הקיי של השם מאפיין בצד שרת של הקובץ
    myData.append('fileSend', fileRef.current.files[0])
    let url = URL_API + '/prods/upload/' + editId
    try {
      let resp = await axios.put(url, myData, {
        headers: {
          'auth-token': localStorage['tok'],
          'content-type': 'multipart/form-data',
        },
      })
      // אם הצליח נקבל 1
      if (resp.data.n == 1) {
        alert('prod added and image uploaded')
        history.push('/profile/userProducts')
      }
      console.log(resp.data)
    } catch (err) {
      console.log(err)
    }
  }

  // 15:02

  return (
    <div className="container">
      <h1>Upload new work</h1>

      <form
        onSubmit={handleSubmit(onFormSub)}
        className="col-lg-6 mx-auto p-2 shadow mt-3"
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Your works name:
          </label>
          <input
            ref={nameRef}
            name="name"
            type="text"
            className="form-control"
            id="name"
            placeholder="Some Name"
          />
          {errors.name && (
            <span className="text-danger">Enter proper name or "Untitled"</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="info" className="form-label">
            Short info about your work:
          </label>
          <input
            defaultValue=""
            ref={infoRef}
            name="info"
            type="text"
            className="form-control"
            id="info"
            placeholder="Size , Media, Date"
          />
          {errors.info && (
            <span className="text-danger">
              Please enter a proper information
            </span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Describe you work:
          </label>
          <input
            defaultValue=""
            ref={descriptionRef}
            name="description"
            type="text"
            className="form-control"
            id="description"
            placeholder="Please describe your work at least 10 words. "
          />
          {errors.description && (
            <span className="text-danger">
              Please enter a proper information at least 10 words
            </span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Starting price:
          </label>
          <input
            defaultValue="1"
            ref={priceRef}
            name="price"
            type="text"
            className="form-control"
            id="price"
            placeholder="The Smaller is better!"
          />
          {errors.price && (
            <span className="text-danger">Enter valid price higer than 0</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image of your work:
          </label>
          <input
            defaultValue="http://"
            ref={imageRef}
            name="img"
            type="text"
            className="form-control"
            id="image"
          />
          {errors.img && (
            <span className="text-danger">Enter valid image higer than 0</span>
          )}
          <label>Upload image from computer:</label>
          <br />
          <input ref={fileRef} type="file" className="me-3" />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            ref={catRef}
            name="category_s_id"
            id="category"
            className="form-select"
          >
            {cat_ar.map((item) => {
              return (
                <option key={item.s_id} value={item.s_id}>
                  {item.name}
                </option>
              )
            })}
          </select>
          {errors.category_s_id && (
            <span className="text-danger">
              There is problem, please wait... or click refresh
            </span>
          )}
        </div>
        <div>
          <h3>Are you owner of these works?</h3>
          <button type="radio"></button>
          <div className="mb-3">
            <label htmlFor="comments" className="form-label">
              Comments:
            </label>
            <input
              defaultValue="bla bla 222"
              ref={commentsRef}
              name="comments"
              type="text"
              className="form-control"
              id="comments"
            />
            {errors.comments && (
              <span className="text-danger">Enter valid comments</span>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Add product
        </button>
      </form>
    </div>
  )
}

export default AddProd
