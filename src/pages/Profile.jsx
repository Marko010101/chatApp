import styled from "styled-components";

import { useCurrentDummyUser } from "../features/users/useCurrentDummyUser.js";
import SpinnerFullPage from "../ui/SpinnerFullPage.jsx";
import Heading from "../ui/Heading.jsx";
import ButtonNeutral from "../ui/Buttons/ButtonNeutral.jsx";
import ErrorFallback from "../ui/ErrorFallback.jsx";
import { useMoveBack } from "../hooks/useMoveBack.js";
import Row from "../ui/Row.jsx";
import { useUserPosts } from "../features/posts/useUsersPosts.js";

const StyledProfile = styled.main`
  display: grid;
  grid-template-columns: 40rem max-content;
  align-items: start;
  border-bottom: var(--border);
`;

const UserImage = styled.div`
  width: 20rem;

  & img {
  }
`;

const UserDetail = styled.div`
  margin-top: 3rem;
`;

const RecreatedBtn = styled(ButtonNeutral)`
  margin-left: 3rem;
`;

function Profile() {
  const moveBack = useMoveBack();
  const {
    currentUserById,
    isLoading,
    error: errorCurrentUser,
  } = useCurrentDummyUser();

  const {
    currentUserPosts,
    isLoading: isLoadingUserPost,
    error,
  } = useUserPosts(currentUserById?.id);

  if (isLoading || !currentUserById || isLoadingUserPost)
    return <SpinnerFullPage />;

  if (errorCurrentUser)
    return (
      <ErrorFallback error={errorCurrentUser} resetErrorBoundary={moveBack} />
    );

  const { firstName, lastName, email, registerDate } = currentUserById;
  const userPostsAmount = currentUserPosts?.data.length;

  return (
    <StyledProfile>
      <UserImage>
        <img
          className="image-user"
          src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
        />
      </UserImage>

      <UserDetail>
        <Row type="horizontal">
          <Heading as="h3">
            {firstName}_{lastName}
          </Heading>
          <RecreatedBtn>Edit profile</RecreatedBtn>
        </Row>
        <Row type="horizontal" mt="5rem">
          <p>
            {userPostsAmount === 0 ? (
              <ButtonNeutral>Add Post</ButtonNeutral>
            ) : (
              userPostsAmount
            )}
          </p>
          <p>Registered: {new Date(registerDate).toLocaleDateString()}</p>
        </Row>
      </UserDetail>
      <p>{email}</p>
    </StyledProfile>
  );
}
export default Profile;
