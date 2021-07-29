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
  let sizeRef = register({ required: true })
  let techniqueRef = register({ required: true })
  let yearCreatedRef = register({ required: true, min: 1000 })

  // artist details inputs
  let nameArtistRef = register({ required: true, minLength: 2 })
  let addressArtistRef = register({ required: true, minLength: 5 })
  let bioArtistRef = register({ required: true, minLength: 100 })
  let typeArtistRef = register({ required: true, minLength: 2 })
  let avatarRef = register({})
  let avatarFileRef = useRef()

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
    //dataBody.qty = 1
    console.log(dataBody)

    // doApi(dataBody)
    doApi(dataBody)
  }

  const doApi = async (dataBody) => {
    if (fileRef.current.files.length == 0 || fileRef.current.files.length > 4) {
      alert('up to 4 Imgages allowed') //checks that no mre works been uploaded
      return
    }

    let url = URL_API + '/prods'
    let data = await doApiMethod(url, 'POST', dataBody)
    // if succed we will get _id prop
    console.log(data)
    if (data._id) {
      uploadFile(data._id)
    } else {
      alert('There is problem try again later')
    }
  }

  const uploadFile = async (_idProd) => {
    // ככה אוספים מידע מקובץ שרוצים לשלוח
    let editId = _idProd
    // שיטה לשליחת מידע כגון קובץ
    for (var i = 0; i < fileRef.current.files.length; i++) {
      filesSendOnyByOne(i, editId)
    }
  }

  const filesSendOnyByOne = async (fileArrayNumber, editId) => {
    const myData = new FormData()
    // fileSend -> הקיי של השם מאפיין בצד שרת של הקובץ
    myData.append('fileSend', fileRef.current.files[fileArrayNumber])
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
        // history.push('/profile/userProducts')
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
        className="col-lg-8  p-2 shadow mt-3"
      >
        <div className="row d-flex">
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
              <span className="text-danger">
                Enter proper name or "Untitled"
              </span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="size" className="form-label">
              Short info about your work:
            </label>
            <input
              defaultValue=""
              ref={sizeRef}
              name="size"
              type="text"
              className="form-control"
              id="size"
              placeholder="ex: 50X90 cm/inch"
            />
            {errors.size && (
              <span className="text-danger">
                Please enter a proper information
              </span>
            )}
          </div>
          <div className="mb-3">
            <input
              defaultValue=""
              ref={techniqueRef}
              name="technique"
              type="text"
              className="form-control"
              id="technique"
              placeholder="Technique used, ex: Oil on Canvas"
            />
            {errors.technique && (
              <span className="text-danger">
                Please enter a proper information
              </span>
            )}
          </div>
          <div className="mb-3">
            <input
              defaultValue=""
              ref={yearCreatedRef}
              name="year_created"
              type="text"
              className="form-control"
              id="year_created"
              placeholder="ex: 2001"
            />
            {errors.year_created && (
              <span className="text-danger">
                Please enter a proper information
              </span>
            )}
          </div>
          <div className="mb-3">
            <input
              defaultValue=""
              ref={infoRef}
              name="info"
              type="text"
              className="form-control"
              id="info"
              placeholder="A few words about this work:"
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
            <label htmlFor="image" className="form-label">
              Image of your work:
            </label>
            <input
              ref={imageRef}
              name="img"
              type="text"
              className="form-control"
              id="image"
              placeholder="http://"
            />
            {errors.img && (
              <span className="text-danger">
                Enter valid image higer than 0
              </span>
            )}
            <label>Upload up to 4 Images</label>
            <br />
            <input ref={fileRef} type="file" className="me-3" multiple />
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
              <span className="text-danger">
                Enter valid price higer than 0
              </span>
            )}
          </div>
        </div>
        <div>
          <h3>Save for future uploaded works</h3>

          <div className="mb-3">
            <label htmlFor="artist_name" className="form-label">
              Creator's Name:
            </label>
            <input
              defaultValue=""
              ref={nameArtistRef}
              name="artist_name"
              type="text"
              className="form-control"
              id="artist_name"
              placeholder="ex: Vincent Van Goh"
            />
            {errors.artist_name && (
              <span className="text-danger">Enter valid Name</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="artist_address" className="form-label">
              Creator's Address:
            </label>
            <input
              defaultValue=""
              ref={addressArtistRef}
              name="artist_address"
              type="text"
              className="form-control"
              id="artist_address"
              placeholder="ex: Tel-Aviv,Israel"
            />
            {errors.artist_address && (
              <span className="text-danger">Enter valid Address</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="artist_bio" className="form-label">
              Creator's Info:
            </label>
            <input
              defaultValue=""
              ref={bioArtistRef}
              name="artist_bio"
              type="text"
              className="form-control"
              id="artistbio"
            />
            {errors.artist_bio && (
              <span className="text-danger">Enter valid Biography</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="artist_type" className="form-label">
              Creator's Type:
            </label>
            <input
              defaultValue=""
              ref={typeArtistRef}
              name="artist_type"
              type="text"
              className="form-control"
              id="artist_type"
              placeholder="ex: Painter"
            />
            {errors.artist_type && (
              <span className="text-danger">Enter valid Type</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="avatar" className="form-label">
              Creator's profile photo:
            </label>
            <input
              defaultValue="http://"
              ref={avatarRef}
              name="avatar"
              type="text"
              className="form-control"
              id="avatar"
            />
            {errors.img && (
              <span className="text-danger">
                Enter valid image higer than 0
              </span>
            )}
            <label>Upload photo:</label>
            <br />
            <input ref={avatarFileRef} type="file" className="me-3" />
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
