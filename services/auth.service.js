class AuthService {
  static sessionIdToUserMap = new Map();
  set(id, user) {
    return AuthService.sessionIdToUserMap.set(id, user);
  }
  get(id) {
    return AuthService.sessionIdToUserMap.get(id);
  }
}

module.exports = new AuthService();
