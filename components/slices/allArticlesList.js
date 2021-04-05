import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../../prismic-configuration";
import CustomLink from "../common/customLink";
import { useAppContext } from "../../pages/_app";
import ResponsiveImage from "../common/responsiveImage";
import TextUtils from "../../utils/text";

class AllArticlesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      blogPostListDefault: [],
      blogPostListFiltered: [],
      blogPostSlicedPage: [],
      selectedPage: 1,
      blogsPerPage: 10,
    };
    this.handleSeachInputChange = this.handleSeachInputChange.bind(this);
  }
  componentDidMount() {
    const { slice, blogCategoryContent: allBlogPostsArray } = this.props;
    const { blogs_per_page: blogsPerPage } = slice.primary;
    const firstBlogPage =
      allBlogPostsArray.length > blogsPerPage
        ? allBlogPostsArray.slice(0, blogsPerPage)
        : allBlogPostsArray;
    this.setState({ blogsPerPage: blogsPerPage });
    this.setState({ blogPostListDefault: allBlogPostsArray });
    this.setState({ blogPostListFiltered: allBlogPostsArray });
    this.setState({ blogPostSlicedPage: firstBlogPage });
    this.setState({ selectedPage: 1 });
  }
  handleSeachInputChange(event) {
    const searchInput = event.target.value;
    const filteredBlogsBySearchInput = this.state.blogPostListDefault.filter((blogPost) => {
      const isIncludedInUid = blogPost.uid.toLowerCase().includes(searchInput.toLowerCase());
      const isIncludedInTitle = JSON.stringify(blogPost.data.title)
        .toLowerCase()
        .includes(searchInput.toLowerCase());
      const isIncludedInText = JSON.stringify(blogPost.data.content)
        .toLowerCase()
        .includes(searchInput.toLowerCase());
      return isIncludedInUid || isIncludedInTitle || isIncludedInText;
    });
    const firstBlogPage =
      filteredBlogsBySearchInput.length > this.state.blogsPerPage
        ? filteredBlogsBySearchInput.slice(0, this.state.blogsPerPage)
        : filteredBlogsBySearchInput;

    this.setState({ searchInput: searchInput });
    this.setState({ blogPostListFiltered: filteredBlogsBySearchInput });
    this.setState({ blogPostSlicedPage: firstBlogPage });
    this.setState({ selectedPage: 1 });
  }
  handlePaginationByPageNumber(page_number) {
    const blogsOfSelectedPage = this.state.blogPostListFiltered.slice(
      (page_number - 1) * this.state.blogsPerPage,
      page_number * this.state.blogsPerPage,
    );
    this.setState({ blogPostSlicedPage: blogsOfSelectedPage });
    this.setState({ selectedPage: page_number });
  }
  handlePagination_prev() {
    if (this.state.selectedPage > 1) {
      this.handlePaginationByPageNumber(this.state.selectedPage - 1);
    }
  }
  handlePagination_next() {
    const numberOfPosiblePages = Math.ceil(
      this.state.blogPostListFiltered.length / this.state.blogsPerPage,
    );
    if (this.state.selectedPage < numberOfPosiblePages) {
      this.handlePaginationByPageNumber(this.state.selectedPage + 1);
    }
  }
  getGeneratedLink(id, type, slug, uid) {
    const link = new Object();
    link.id = id;
    link.type = type;
    link.tags = ["sprint"];
    link.slug = slug;
    link.lang = "en-us";
    link.uid = uid;
    link.link_type = "Document";
    link.isBroken = false;
    return link;
  }
  renderSearchbar() {
    return (
      <div className="z-10 relative flex w-full flex-wrap items-stretch mb-3 mt-4 border-2 border-gray-200 p-1 rounded">
        <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center pl-3 py-3 w-full border-gray-200">
          <img
            className="w-5 mb-2"
            src="/img/search-solid.svg"
            alt=""
            style="filter: invert(15%) sepia(77%) saturate(520%) hue-rotate(157deg) brightness(93%) contrast(97%);"
          />
        </span>
        <input
          type="text"
          className="z-20 w-full h-full ml-8 p-2"
          key="random1"
          value={this.state.searchInput}
          placeholder={"Search Articles"}
          onChange={this.handleSeachInputChange}
        />
      </div>
    );
  }
  renderPagination() {
    const existsMoreThanOnePage = this.state.blogPostListFiltered.length > this.state.blogsPerPage;
    if (existsMoreThanOnePage) {
      const numberOfPosiblePages = Math.ceil(
        this.state.blogPostListFiltered.length / this.state.blogsPerPage,
      );
      let paginationButtons = [];
      for (let i = 1; i <= numberOfPosiblePages; i++) {
        paginationButtons.push(
          <button
            className="relative inline-flex items-center mx-2 px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => this.handlePaginationByPageNumber(i)}
            key={`page_${i}`}
          >
            {i}
          </button>,
        );
      }
      return (
        <div className="bg-white px-4 sm:px-6 pt-5 pb-3 flex items-center justify-center  ">
          <div className="flex flex-none items-center justify-between">
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  href="#"
                  key={"button_prev"}
                  onClick={() => this.handlePagination_prev()}
                  className="relative inline-flex items-center mx-2 px-2 py-2 rounded-l-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Preview
                </button>
                {paginationButtons}
                <button
                  href="#"
                  key={"button_next"}
                  onClick={() => this.handlePagination_next()}
                  className="relative inline-flex items-center mx-2 px-2 py-2 rounded-r-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  Next
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      );
    }
    return;
  }
  renderCategories(blogCategoriesArray) {
    return (
      <div className="my-6 flex flex-wrap ">
        {blogCategoriesArray.map((card, index) => {
          const viewMoreLink = this.getGeneratedLink(
            card.id,
            "blog_category",
            card.slugs[0],
            card.uid,
          );
          return (
            <CustomLink key={index} link={viewMoreLink} classes="btnCategory text-xl">
              {card.data.name}
            </CustomLink>
          );
        })}
      </div>
    );
  }
  renderBlogs(blogPostsArraySorted) {
    return (
      <div className={"flex flex-col"}>
        {blogPostsArraySorted.map((card, index) => {
          const generatedLink = this.getGeneratedLink(
            card.id,
            "blog_post",
            card.slugs[0],
            card.uid,
          );
          const { image, title, content } = card.data;
          if (!card) {
            return <> </>;
          }
          const hasTitle = TextUtils.hasRichText(title);
          const hasContent = TextUtils.hasRichText(content);
          return (
            <CustomLink key={index} link={generatedLink}>
              <div className="h-40 overflow-hidden w-full flex flex-row items-center mb-2 md:mb-7">
                <div className="w-2/12">
                  <ResponsiveImage
                    image={image}
                    className={"object-cover object-left-top w-full "}
                    sizes="(min-width:1280) 160px, (min-width:768)160px, 160px"
                  />
                </div>
                <div className="w-10/12 h-36 px-6">
                  {hasTitle && (
                    <p className="cardText sm:truncate my-4 text-xl font-bold text-left w-full overflow-hidden">
                      {RichText.render(title, linkResolver)}
                    </p>
                  )}
                  {hasContent && (
                    <div className="cardText text-left w-full overflow-hidden ">
                      <p className="text-primary">{content[0].text}</p>
                    </div>
                  )}
                </div>
              </div>
            </CustomLink>
          );
        })}
      </div>
    );
  }
  render() {
    const { blogCategories: blogCategoriesArray } = useAppContext();
    const { slice } = this.props;
    const { grid_title: gridTitle } = slice.primary;

    return (
      <div className="bg-white container mx-auto pt-0 pb-5 px-6 lg:px-20 relative -mt-32">
        <div className="container flex flex-col  md:px-0 mx-auto">
          <div className="w-full items-start text-2xl font-bold text-left self-start md:text-3xl text-primary-dark ">
            {gridTitle}
            <div className="flex justify-start">
              <div className="separator no-margin my-4 md:h-auto  mx-0 items-start" />
            </div>
          </div>
          <div className="w-full flex flex-row flex-wrap">{this.renderSearchbar()}</div>
          <div className="w-full flex flex-row flex-wrap">
            {this.renderCategories(blogCategoriesArray)}
          </div>
          <div className="flex flex-col mt-7 w-full h-auto text-primary-dark">
            {this.renderBlogs(this.state.blogPostSlicedPage)}
          </div>
          <div>{this.renderPagination()}</div>
        </div>
      </div>
    );
  }
}

export default AllArticlesList;
