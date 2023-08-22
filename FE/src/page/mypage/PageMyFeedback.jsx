import Layout from "../../layout/Layout";
import React from "react";
import MyPageContainer from "../../containers/mypage/MyPageContainer";
import MyPageFeedback from "../../containers/mypage/MyPageFeedback";
function PageMyFeedback() {
  return (
    <Layout>
      <MyPageContainer />
      <MyPageFeedback />
    </Layout>
  )
}
export default PageMyFeedback;