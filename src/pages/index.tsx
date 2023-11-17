"use client";
import { Box, Grid } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { Carousel } from "react-responsive-carousel";

// import dtrust from "../components/Image/dtrust.mov";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default function Home() {
  const router = useRouter();
  const styles = {
    cover: {
      padding: "15vh  0 10vh 0",
      backgroundColor: "#fe7e34",
    },
    carouselContainer: {
      textAlign: "center",
      fontSize: "72px",
      maxWidth: "880px",
      whiteSpace: "pre-line",
      margin: "0 auto",
    },
    docsPart: {
      margin: "15vh auto 0 auto",
      textAlign: "center",
    },
    acknowledge: {
      padding: "100px 5vw 0px 5vw",
      backgroundImage: `url(/background.jpg)`,
    },
    aboutus: {
      textAlign: "center",
      padding: "50px",
      fontSize: "large",
    },
  };
  return (
    <>
      <main className="">
        <Head>
          <title>Decentralized Trust Agreements</title>
          <meta
            name="description"
            content="DTrust generates decentralized smart contract trust agreements on the ethereum network for estate planning, asset protection, and much more."
            key="desc"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
          ></link>
          <meta property="og:title" content="Decentralized Trust Agreements" />
          <meta
            property="og:description"
            content="DTrust generates decentralized smart contract trust agreements on the ethereum network for estate planning, asset protection, and much more."
          />
          <meta property="og:image" content="/metatag.jpg" />
        </Head>

        <div style={styles.cover}>
          <div className="carousel-wrapper">
            <Carousel
              infiniteLoop
              useKeyboardArrows
              autoPlay
              showThumbs={false}
              showArrows={false}
              showIndicators={false}
              interval={4000}
              stopOnHover={false}
              style={styles.carouselContainer}
            >
              {[
                "Code is law.",
                "Ethereum is a jurisdiction.",
                "Use a dtrust for asset protection.",
                "Use a dtrust for probate avoidance.",
                "Use a dtrust for estate administration.",
                "Use a dtrust for tax planning.",
                "Use a dtrust for structured giving.",
                "Use a dtrust for asset management.",
              ].map((item, index) => (
                <div
                  key={index}
                  className="box-border text-center text-[54px] "
                >
                  {item}
                </div>
              ))}
            </Carousel>
          </div>
          <div style={styles.docsPart}>
            DTrust generates decentralized trust agreements on the ethereum
            virtual machine.&nbsp;
            <a
              className="text-black"
              href="https://dtrust.notion.site/Docs-4264b09c1b1f4a028a7d069c62e1ea47"
            >
              Docs
            </a>
          </div>
        </div>
        <section className="page-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="team-member">
                  <img className="mx-auto img-content" src="/1.png" alt="..." />
                  <h2 className="img-icon">
                    01
                    <br />
                    Click{" "}
                    <span style={{ color: "red", opacity: ".70" }}>
                      "Get Started"
                    </span>
                    , <br />
                    Enter Details, Submit
                  </h2>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="team-member">
                  <img className="mx-auto img-content" src="/2.png" alt="..." />
                  <h2 className="img-icon">
                    02
                    <br />1 Hour{" "}
                    <span style={{ color: "red", opacity: ".70" }}>
                      Zoom Call <br />
                    </span>
                    strategy session with a lawyer.
                  </h2>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="team-member">
                  <img className="mx-auto img-content" src="/3.png" alt="..." />
                  <h2 className="img-icon">
                    03
                    <br />
                    <span style={{ color: "red", opacity: ".70" }}>
                      Full Access{" "}
                    </span>
                    to the
                    <br />{" "}
                    <span style={{ color: "red", opacity: ".70" }}>
                      DTrust{" "}
                    </span>
                    system to create unlimited dtrusts.
                  </h2>
                </div>
              </div>
            </div>
            <a
              style={{
                cursor: "pointer",
                textAlign: "center",
                marginLeft: "500px",
              }}
              onClick={() => router.push("/payment")}
              className="payment"
            >
              Get Started
            </a>
          </div>
        </section>
        <section className="content-video">
          <div className="container-fluid">
            <div className="row">
              <div className="col left-home">
                <div className="left-home-content">
                  <div className="left-home-mini">
                    <div className="row">
                      <div className="col-md-4 left-home-img">
                        <img src="/mini-logo.jpg" width={80} />
                      </div>
                      <div className="col-md-8 left-home-h5">
                        <h5>What is DTrust?</h5>
                      </div>
                    </div>
                  </div>
                  <div className="mini-content-button">
                    <img src="/whatisdtrust.png" />
                  </div>
                  <div className="mini-content-left">
                    <div>
                      <p className="mini-p">
                        DTrust can generate unlimited smart contract
                        trusts–called dtrusts. There are two parts to DTrust,
                        the decentralized application (DApp) and the web
                        application (webapp). While the webapp is hosted on a
                        private server like any website, the DApp runs on the
                        ethereum blockchain. When you use DTrust, your smart
                        contract trust will run on the worlds largest smart
                        contract network. No matter what happens to the webapp,
                        your smart contract will remain secure on the DApp
                        accessible with your ethereum wallet.
                      </p>
                      <p className="mini-p">
                        DTrust DApp can handle any ethereum based tokens
                        including dollar denominated stable coins, gold backed
                        coins, bitcoin backed coins, the native token eth, and
                        many more. The DApp's only fees are ethereum gas fees
                        and a 10 basis point annual fee–that is one one
                        thousandth per year.
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className="e-hosted-video">
                  <h3>App Demo</h3>
                  <video
                    className="hosted-video"
                    src="/dtrust_video.mov"
                    preload="metadata"
                    controlslist="nodownload"
                  />
                </div> */}
                <div className="e-hosted-video">
                  <h3>App Demo</h3>
                  <video
                    className="hosted-video"
                    controls
                    preload="metadata"
                    controlsList="nodownload"
                  >
                    <source src="/dtrust_video.mov" type="video/quicktime" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              <div className="col right-home">
                <section className="mini-home">
                  <div className="row">
                    <div className="col">
                      <div className="e-hosted-video">
                        <div className="mini-head">
                          {/*<img src="/5.png" width="140">*/}
                          <h3>Advantages of DTrust</h3>
                          <div className="dotted-divider">
                            <span className="divider" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="mini-content">
                  <div className="content-1">
                    <div className="row">
                      <div className="col-md-3">
                        <img className="first-img" src="/12.png" />
                      </div>
                      <div className="col-md-9">
                        <p className="first">
                          <strong>First,</strong> DTrust is more convenient for
                          cryptocurrency. There is no need to add wallet
                          addresses to legal documents, because the dtrust
                          itself is a wallet in the ethereum network.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="content-2">
                    <div className="row">
                      <div className="col-md-3">
                        <img className="dollor" src="/dollor.png" />
                      </div>
                      <div className="col-md-9">
                        <p className="second">
                          <strong>Second,</strong> DTrust is often cheaper. The
                          gas fees to create a dtrust are usually less than
                          $200. Besides the gas fees, the only cost for setup
                          are fees for legal advice. Once your dtrust is set up
                          you can do things like revoke and make irrevocable
                          easily and quickly without a lawyer billing you more
                          hours. Lawyers quote $20k minimum to set up a Cook
                          Islands Trust, but someone could use DTrust for a few
                          hundred dollars to enjoy similar benefits.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="content-3">
                    <div className="row">
                      <div className="col-md-9 third-content">
                        <div className="radius-content">
                          <p className="third">
                            <strong>Third,</strong> DTrust is decentralized and
                            independent of any particular institutions. No
                            particular institutions–courts, banks, etc.–can void
                            a dtrust. Even the best law-trusts rely on certain
                            key institutions. If those institutions decide to
                            void a law-trust and distribute assets to someone
                            other than a beneficiary, they can do it. The
                            immutable and decentralized nature of the ethereum
                            blockchain, make dtrusts stronger. Remember, a
                            dtrust can be easily integrated within a law-trust
                            to add strength, without losing any of the law-trust
                            functionality.
                          </p>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <img className="circle" src="/7.png" />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* <Grid style={{ background: "#ececec" }} container>
        <Grid item lg={8} mx="auto">
          <Box
            style={{ display: "flex", justifyContent: "space-between" }}
            mt={5}
          >
            <Box style={{ fontWeight: "600", fontSize: "20px" }}>
              <Box>
                <img
                  style={{ width: "80%" }}
                  src="https://developeraspl.in/demo1/dtrust2//1.png"
                  alt=""
                />
              </Box>
              <Box>01</Box>
              <Box>
                Click <span style={{ color: "#ff0000ad" }}>"Get Started"</span>
              </Box>
              <Box>Enter Details, Submit</Box>
            </Box>
            <Box style={{ fontWeight: "600", fontSize: "20px" }}>
              <Box>
                <img
                  style={{ width: "80%" }}
                  src="https://developeraspl.in/demo1/dtrust2//2.png"
                  alt=""
                />
              </Box>
              <Box>01</Box>
              <Box>
                Click <span style={{ color: "#ff0000ad" }}>"Get Started"</span>
              </Box>
              <Box>Enter Details, Submit</Box>
            </Box>
            <Box style={{ fontWeight: "600", fontSize: "20px" }}>
              <Box mb={4}>
                <img
                  style={{ width: "80%" }}
                  src="https://developeraspl.in/demo1/dtrust2//3.png"
                  alt=""
                />
              </Box>
              <Box>01</Box>
              <Box>
                Click <span style={{ color: "#ff0000ad" }}>"Get Started"</span>
              </Box>
              <Box>Enter Details, Submit</Box>
            </Box>
          </Box>
          <Box mt={5} mb={5} style={{}} className="text-center">
            <button
              style={{
                background: "#f3792f",
                fontSize: "25px",
                fontWeight: "500",
                color: "white",
                padding: "10px 60px 8px 60px",
                borderRadius: "7px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Get Started
            </button>
          </Box>
        </Grid>
      </Grid>
      <Grid style={{ marginTop: "10px" }} container>
        <Grid style={{ background: "#ededed" }} item lg={6}>
          <Box className="text-center" style={{ display: "flex" }}>
            <Box>
              <img
                style={{ width: "50%" }}
                src="https://developeraspl.in/demo1/dtrust2//mini-logo.jpg"
                alt=""
              />
            </Box>
            <Box
              style={{
                fontSize: "50px",
                fontWeight: "500",
                background: "#d7d7d7",
                padding: "5px",
                width: "200px",
              }}
            >
              <Box style={{ paddingRight: "50px" }}>What is DTrust</Box>
            </Box>
          </Box>

          <Box style={{ padding: "25px" }}>
            <Box>
              <img
                style={{ width: "100%" }}
                src="https://developeraspl.in/demo1/dtrust2//whatisdtrust.png"
                alt=""
              />
            </Box>
            <Box style={{ fontSize: "18px" }}>
              <p>
                DTrust can generate unlimited smart contract trusts–called
                dtrusts. There are two parts to DTrust, the decentralized
                application (DApp) and the web application (webapp). While the
                webapp is hosted on a private server like any website, the DApp
                runs on the ethereum blockchain. When you use DTrust, your smart
                contract trust will run on the worlds largest smart contract
                network. No matter what happens to the webapp, your smart
                contract will remain secure on the DApp accessible with your
                ethereum wallet.
              </p>
              <Box>
                DTrust DApp can handle any ethereum based tokens including
                dollar denominated stable coins, gold backed coins, bitcoin
                backed coins, the native token eth, and many more. The DApp's
                only fees are ethereum gas fees and a 10 basis point annual
                fee–that is one one thousandth per year.
              </Box>
            </Box>
          </Box>
          <Box
            style={{ color: "#fe8d48", fontSize: "57px" }}
            className="text-center"
          >
            App Demo
          </Box>
          <Box>
            <iframe src="https://www.youtube.com/watch?v=r6NQYcIqkTI"></iframe>
          </Box>
        </Grid>
        <Grid style={{ background: "#e1dfe0" }} item lg={6}>
          <Box
            mt={2}
            className="text-center"
            style={{
              fontWeight: "600",
              fontSize: "50px",
              color: "#fe8d48",
              marginBottom: "-28px",
            }}
          >
            Advantage of DTrust
          </Box>
          <Box ml={5} style={{ fontSize: "30px", marginLeft: "" }}>
            - - - - - - - - - - - - - -
          </Box>
        </Grid>
      </Grid> */}
    </>
  );
}
