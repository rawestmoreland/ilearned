import Giscus from '@giscus/react';

export default function GiscussComments() {
  return (
    <Giscus
      id="comments"
      repo="rawestmoreland/ilearned"
      repoId="R_kgDOHaFGLA"
      category="Announcements"
      categoryId="DIC_kwDOHaFGLM4CSBcs"
      mapping="og:title"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme="light"
      lang="en"
      loading="lazy"
    />
  );
}
