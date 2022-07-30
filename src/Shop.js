import React from "react";

export default function Shop(props) {
  return (
    <section className="lineContainer">
      <div class="blog-card python" style={{backgroundImage:`url(${props.Pimg})`}}>
        <div class="content-mask">
          <h1>{props.Pname}</h1>
          <p>{props.Pdesc}</p>
          {/* <div class="post-detail">
            <span class="icon"> 
              <svg
                class="svg-inline--fa fa-calendar-alt fa-w-14"
                aria-hidden="true"
                data-prefix="far"
                data-icon="calendar-alt"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"
                ></path>
              </svg>
            </span>
            <span class="date">19 May 2018</span>
          </div> */}
          <span className="priceContainer"> <span className="priceText">₹{props.Pprice}</span> <span className="python category">Buy Now</span> </span>
        </div>
        <div className="horizontal"></div>
      </div>
    </section>
  );
}


// <div className="card nftCard ">
{/* <img className="card-img-top nftimg" src={props.Pimg} />
<div className="card-header">Serial ID: {props.PseriaId}</div>
<ul className="list-group list-group-flush">
  <li className="list-group-item nftCardItem">Name: {props.Pname} </li>
  <li className="list-group-item nftCardItem">
    Product Description: {props.Pdesc}{" "}
  </li>
  <li className="list-group-item nftCardItem">
    Price: {props.Pprice}{" "}
  </li>
  <button type="submit" className=" btn btn-outline-light btn-lg">
    Shop Now!!
  </button>
</ul>
</div>
<br></br> */}