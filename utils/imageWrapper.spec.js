import ImageWrapper from "./imageWrapper";

describe("ImageWrapper", () => {
  let image, opts;

  beforeEach(() => {
    image = {
      dimensions: {
        width: 200,
        height: 100,
      },
      url: "https://myImage.png",
    };
    opts = {};
  });

  describe("getSrc()", () => {
    test("should return the image with the right width and height attributes", () => {
      const wrapper = new ImageWrapper(image, opts);
      const src = wrapper.getSrc();
      const srcUrl = new URL(src);
      expect(srcUrl.searchParams.get("w")).toEqual("100");
      expect(srcUrl.searchParams.get("h")).toEqual("50");
    });

    describe("with options.defaultResizeFactor", () => {
      beforeEach(() => {
        opts.defaultResizeFactor = 0.1;
      });

      test("should return the image with the corresponding width and height attributes", () => {
        const wrapper = new ImageWrapper(image, opts);
        const src = wrapper.getSrc();
        const srcUrl = new URL(src);
        expect(srcUrl.searchParams.get("w")).toEqual("20");
        expect(srcUrl.searchParams.get("h")).toEqual("10");
      });
    });

    describe("with options.boxWidth and options.boxHeight", () => {
      describe("aspect ratio greater than actual image", () => {
        beforeEach(() => {
          opts.boxWidth = 30;
          opts.boxHeight = 10;
        });

        test("should resize default image to match box height", () => {
          const wrapper = new ImageWrapper(image, opts);
          const src = wrapper.getSrc();
          const srcUrl = new URL(src);
          expect(srcUrl.searchParams.get("w")).toEqual("20");
          expect(srcUrl.searchParams.get("h")).toEqual("10");
        });
      });

      describe("aspect ratio lower than actual image", () => {
        beforeEach(() => {
          opts.boxWidth = 100;
          opts.boxHeight = 100;
        });

        test("should resize default image to match box width", () => {
          const wrapper = new ImageWrapper(image, opts);
          const src = wrapper.getSrc();
          const srcUrl = new URL(src);
          expect(srcUrl.searchParams.get("w")).toEqual("100");
          expect(srcUrl.searchParams.get("h")).toEqual("50");
        });
      });
    });
  });

  describe("getSrcSet()", () => {
    test("should return the image set for the default factors", () => {
      const wrapper = new ImageWrapper(image, opts);
      const srcSet = wrapper.getSrcSet();
      expect(srcSet).toEqual(
        "https://myimage.png/?w=200&h=100 200w, https://myimage.png/?w=150&h=75 150w, https://myimage.png/?w=100&h=50 100w, https://myimage.png/?w=70&h=35 70w, https://myimage.png/?w=40&h=20 40w",
      );
    });

    describe("with options.factors", () => {
      beforeEach(() => {
        opts.resizeFactors = [2, 1];
      });

      test("should return the srcSet for the corresponding factors", () => {
        const wrapper = new ImageWrapper(image, opts);
        const srcSet = wrapper.getSrcSet();
        expect(srcSet).toEqual(
          "https://myimage.png/?w=200&h=100 200w, https://myimage.png/?w=100&h=50 100w",
        );
      });
    });

    describe("with options.boxWidth and options.boxHeight", () => {
      describe("image smaller than box", () => {
        beforeEach(() => {
          opts.boxWidth = 100;
          opts.boxHeight = 100;
        });

        test("should return the srcSet with all values matching the box", () => {
          const wrapper = new ImageWrapper(image, opts);
          const srcSet = wrapper.getSrcSet();
          expect(srcSet).toEqual(
            "https://myimage.png/?w=200&h=100 200w, https://myimage.png/?w=150&h=75 150w, https://myimage.png/?w=100&h=50 100w, https://myimage.png/?w=70&h=35 70w, https://myimage.png/?w=40&h=20 40w",
          );
        });
      });

      describe("image larger than box", () => {
        beforeEach(() => {
          opts.boxWidth = 50;
          opts.boxHeight = 50;
        });

        test("should return the srcSet with all values matching the box", () => {
          const wrapper = new ImageWrapper(image, opts);
          const srcSet = wrapper.getSrcSet();
          expect(srcSet).toEqual(
            "https://myimage.png/?w=100&h=50 100w, https://myimage.png/?w=75&h=38 75w, https://myimage.png/?w=50&h=25 50w, https://myimage.png/?w=35&h=18 35w, https://myimage.png/?w=20&h=10 20w",
          );
        });
      });
    });
  });
});
