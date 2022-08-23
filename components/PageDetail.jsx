import React, { useEffect, useRef, useState } from "react";
import postStyles from "./post-styles.module.css";
import Head from "next/head";
import { AdsContainer } from "./AdsContainer";
import Timer from "./Timer";
import SupportSuccess from "./SupportSuccess";
import Modal from "react-responsive-modal";
import { getMeRandomNum } from "./PostDetail";

const PageDetail = ({ page, url, slug }) => {
  const [showDownload, setShowDownload] = useState(false);
  const [initialTimerFlag, setInitialTimerFlag] = useState(false);
  const [flag, setFlag] = useState(false);
  const [decisionNo, setDecisionNo] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const initialRenderRef = useRef(true);

  useEffect(() => {
    if (initialRenderRef.current) {
      setInitialTimerFlag(true);
    }
    initialRenderRef.current = false;
  }, []);

  const onFinishTimer = (when) => {
    if (when === "initial") {
      setDecisionNo(`${getMeRandomNum()}`);
      setShowDownload(true);
    } else {
      if (!!redirectUrl) {
        window.open(redirectUrl);
        setFlag(false);
      }
    }
  };

  const checkForLinkValidation = (finalRedirectUrl) => {
    let link = prompt(
      `Hit On any Ad, Copy redirected Url & put it here To Support this Forum: `
    );
    if (
      link &&
      link.length > 100 &&
      link.includes("https", 0) &&
      link.includes("gclid=")
    ) {
      setRedirectUrl(finalRedirectUrl);
      setFlag(true);
      setShowDownload(false);
      setInitialTimerFlag(false);
    } else {
      alert("Try Again! here only valid urls are allowed");
    }
  };

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.title} />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2093009960356176"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
        <AdsContainer
          client={"ca-pub-2093009960356176"}
          slot={"6096288180"}
          adFormat={"auto"}
        />
        <div className="px-4 py-4 sm:py-2 lg:px-0">
          <div
            className={`max-w-2xl mx-auto post ${postStyles.post}`}
            dangerouslySetInnerHTML={{ __html: page.content.html }}
          />
        </div>
        {url && slug === "about" && (
          <div className="py-4 text-center">
            {showDownload ? (
              <>
                {["0","1", "2", "3"].includes(decisionNo) ? (
                  <span
                    onClick={() => checkForLinkValidation(url)}
                    className="hover:shadow-xl hover:scale-95 hover:bg-indigo-700 m-1 sm:my-2 transition duration-150 text-xs sm:text-base font-bold inline-block bg-pink-600 rounded-full text-white px-4 py-2 sm:px-8 sm:py-3 cursor-pointer"
                  >
                    Download..
                  </span>
                ) : (
                  <>
                    <span
                      onClick={() => window.open(url)}
                      className="hover:shadow-xl hover:scale-95 hover:bg-indigo-700 m-1 sm:my-2 transition duration-150 text-xs sm:text-base font-bold inline-block bg-pink-600 rounded-full text-white px-4 py-2 sm:px-8 sm:py-3 cursor-pointer"
                    >
                      Download..
                    </span>
                  </>
                )}
              </>
            ) : (
              <>
                {initialTimerFlag && (
                  <p className="text-md text-gray-600 dark:text-gray-400 font-normal text-center">
                    Your download link is getting generated <br /> in{" "}
                    <Timer
                      seconds={20}
                      onFinish={() => onFinishTimer("initial")}
                    />{" "}
                    seconds
                  </p>
                )}
              </>
            )}
          </div>
        )}
        <AdsContainer
          client={"ca-pub-2093009960356176"}
          slot={"6096288180"}
          adFormat={"auto"}
        />
        <AdsContainer
          client={"ca-pub-2093009960356176"}
          slot={"6341267557"}
          adFormat={"autorelaxed"}
        />
      </div>
      {flag && (
        <Modal
          classNames={{
            overlayAnimationIn: "customEnterOverlayAnimation",
            overlayAnimationOut: "customLeaveOverlayAnimation",
            modalAnimationIn: "customEnterModalAnimation",
            modalAnimationOut: "customLeaveModalAnimation",
          }}
          animationDuration={500}
          open={flag}
          onClose={() => setFlag(false)}
          showCloseIcon={false}
          styles={{
            modal: {
              background: "#FFFF00",
              borderRadius: "20px",
            },
          }}
        >
          <SupportSuccess
            setFlag={setFlag}
            onFinish={() => onFinishTimer("final")}
          />
        </Modal>
      )}
    </>
  );
};

export default PageDetail;
