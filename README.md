## nextjs을 타입스크립트 환경에서 사용하기

nextjs 프레임워크를 타입스크립트 환경에서 사용해 보았습니다.

- params : dynamic route 구현 시 사용되는 파일 명 내의 이름들을 포함한 인터페이스. [type].tsx 이면 type이 params에 포함된다.

  params는 querystring 라이브러리의 ParsedUrlQuery를 상속해야 하므로, value 위치에 string|string\[\] 만 올 수 있다.
- IProps : 페이지 컴포넌트에서 사용되는 프로퍼티를 정의한 타입으로, getStaticProps 혹은 getServerSideProps에서 생성한 데이터를 나타내는 인터페이스이다.


- 페이지 : NextPage<IProps> 상속. 외부(getStaticProps 등 포함) 에서 받아오는 프로퍼티가 없다면 제네릭 설정은 필요 없음.
  - getStaticProps 에서 받아오는 경우 : IProps 에 InferGetStaticPropsType<typeof getStaticProps> 이 포함된다.
  - getServerSideProps 에서 받아오는 경우 : IProps 에 InferGetServerSidePropsType<typeof getServerSideProps> 이 포함된다.
- getStaticProps : GetStaticProps<IProps, params> 상속하는 함수 생성 및 context가 GetStaticPropsContext<params> 상속. 
- getStaticPaths : GetStaticPaths<params> 상속 및 context가 GetStaticPathsContext 상속
- getServerSideProps : GetServerSideProps<IProps, params> 상속하는 함수 생성 및 context가 GetServerSidePropsContext<params> 상속

주의 : get 함수들은 공통적으로 Get ~ 인터페이스를 제대로 구현했다면 context가 Get ~ Context 인터페이스를 상속하지 않아도 된다. 
  
반대로 해당 함수들이 Get ~ 타입을 상속하지 않는 대신 context에서 Get ~ Context 타입을 상속해도 함수는 정상적으로 동작하지만, 이 경우 Infer ~ 인터페이스에 의한 타입 추론은 안되므로 Get ~ 타입을 상속하게 코드를 작성하는 것이 더 편하다.
 
  
# 결론
  
동적 경로 사용시 경로에 대응되는 인터페이스 params 및 get~Props 함수에서 가져올 데이터 인터페이스 IProps을 생성한다.
  
페이지는 NextPage<InferGetServerSidePropsType<typeof get~Props>> 타입으로 만든다.

getStaticPath는 GetStaticPaths<Params> 을 상속한다. (context는 GetStaticPathsContext을 상속 가능)
  
getStaticProps는 GetStaticProps<IProps,Params> 을 상속한다. (context는 GetStaticPropsContext<Params> 상속 가능 )
  
getServerSideProps는 GetServersideProps<IProps,Params> 을 상속한다. (context는 GetServerSideContext<Params> 상속 가능 )
