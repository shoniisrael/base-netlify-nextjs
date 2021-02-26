import React, { Component } from "react";
import CustomLink from "../common/customLink";
import { RichText } from "prismic-reactjs";
import { useAppContext } from "../../pages/_app";
import TextUtils from "../../utils/text";

class JobPostCards extends Component {
  render() {
    const { slice } = this.props;
    const { hidden_title: hiddenTitle } = slice.primary;
    const { jobPosts } = useAppContext();
    const activeJobPosts = jobPosts.filter((jobpost) => jobpost.data.is_active);
    const hasHiddenTitle = TextUtils.hasRichText(hiddenTitle);
    if (!activeJobPosts.length) {
      return null;
    }
    return (
      <div className="bg-primary-aliceBlue">
        {hasHiddenTitle && <div className="hidden">{RichText.render(hiddenTitle)}</div>}
        <div className="lg:container mx-6 md:mx-10 lg:mx-auto lg:px-20 pt-12 xl:pt-16 pb-16">
          <div className="container mx-auto grid grid-cols-1 place-items-stretch gap-y-6 md:grid-cols-3 md:gap-x-6 xl:gap-x-20 md:gap-y-10 lg:gap-y-16 text-base">
            {activeJobPosts.map((activeJobPost, index) => {
              const { id, type, tags, lang, uid } = activeJobPost;
              const {
                card_title: cardTitle,
                card_description: cardDescription,
              } = activeJobPost.data;
              const cardLink = {
                id,
                type,
                tags,
                lang,
                uid,
                link_type: "Document",
                isBroken: false,
              };

              return (
                <CustomLink key={index} link={cardLink}>
                  <div className="card hover_translate-y-2 h-full w-full flex flex-col mb-7 pt-10 lg:pb-10 xl:pb-10 px-6 lg:px-10 xl:max-w-1/5">
                    <div className="text-2xl font-bold py-3 lg:pb-6 text-primary-dark">
                      {RichText.render(cardTitle)}
                    </div>
                    <div>{RichText.render(cardDescription)}</div>
                  </div>
                </CustomLink>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default JobPostCards;
