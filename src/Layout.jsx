import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
import { getUserInfo } from "./api/auth";

const Navbar = styled.div`
  background-color: #222222;
  color: white;
  min-width: 1440px;
  display: flex;
  justify-content: space-between;
  position: sticky;
  align-items: center;
  top: 0;
  z-index: 10000;
  height: 80px;
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
`;

const NavItem = styled(Link)`
  color: white;
  margin: 0 10px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserName = styled.span`
  color: white;
  margin-right: 20px;
`;

const LogoutButton = styled.button`
  padding: 8px 12px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  margin: 0 10px;

  cursor: pointer;

  &:hover {
    background-color: #cc0000;
  }
`;

const PageContainer = styled.div`
  padding: 10px 20px;
`;

export default function Layout({ user, setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo().then((res) => {
      if (res) {
        setUser({
          userId: res.id,
          nickname: res.nickname,
          avatar: res.avatar,
        });
      } else {
        console.log(res);
        handleLogout();
      }
    });
  }, []);

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
    localStorage.clear();
  };

  return (
    <>
      <Navbar>
        <NavItems>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/profile">내 프로필</NavItem>
        </NavItems>
        <UserProfile>
          {user && (
            <>
              <UserAvatar src={user.avatar} alt="User Avatar" />
              <UserName>{user.nickname}</UserName>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </>
          )}
        </UserProfile>
      </Navbar>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </>
  );
}
