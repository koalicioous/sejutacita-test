/**
 * @swagger
 * /api/auth/signup:
 *  post:
 *      summary: Create new user record
 *      consumes:
 *          - application/json
 *      description: Insert new user data into database
 *      parameters:
 *          - in: body
 *            schema:
 *              type: object
 *              required:
 *                  - email
 *                  - password
 *              properties:
 *                  email:
 *                      type: string
 *                      example: newuser@server.com
 *                  password:
 *                      type: string
 *                      example: SecurePassword2021
 *      responses:
 *          200:
 *              description: Successfully created new user
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: success message
 *                                  example: Berhasil membuat user baru
 *          500:
 *              description: Invalid body request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: Failure message
 *                                  example: Invalid Request
 *  
 */
/**
 * @swagger
 * /api/auth/signin:
 *  post:
 *      summary: Generate access token and refresh token for accessing resources
 *      parameters:
 *          - in: body
 *            schema:
 *              type: object
 *              required:
 *                  - email
 *                  - password
 *              properties:
 *                  email:
 *                      type: string
 *                      example: admin@sejutacita.id
 *                  password:
 *                      type: string
 *                      example: 123456
 *      responses:
 *          200:
 *              description: Successfully authenticate user's credential
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: string
 *                                  example: 12kjh1238sdf881238sf
 *                              email:
 *                                  type: string
 *                                  example: admin@sejutacita.id
 *                              roles:
 *                                  type: object
 *                                  example: ['ROLE_ADMIN']
 *                              accessToken:
 *                                  type: string
 *                                  example: 1jdsfk3124ksdfk923/.idfjsiefjsi21231255kn234nnn2u?
 *                              refreshToken:
 *                                  type: string
 *                                  example: 1jdsfk3124ksdfk923/.idfjsiefjsi21231255kn234nnn2u?
 *          401:
 *              description: Invalid credential
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Password salah
 *          404:
 *              description: User not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: User tidak ditemukan
 *          500:
 *              description: Internal server error
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Invalid request
 */
/**
 * @swagger
 * /api/auth/refreshToken:
 *  post:
 *      summary: Generate new access token with refresh token
 *      parameters:
 *          - in: body
 *            schema:
 *              type: object
 *              required:
 *                  - refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 *                      example: jhkj1h23123123kjh123812388123hasdf
 *      responses:
 *          200:
 *              description: Successfylly generate new access token with refresh token
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              accessToken:
 *                                  type: string
 *                                  example: sdf9@84iasdfj3$jasdf?/asdfl
 *                              refreshToken:
 *                                  type: string
 *                                  example: 234oadfasdfaoooadf/234
 *          403:
 *              description: Refresh token is invalid, expired, or not provided
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Refresh token was expired. Please sign in again
 *          500:
 *              description: Internal server error
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:  
 *                                  type: string
 *                                  example: Internal server error     
 */
/**
 * @swagger
 * /api/user:
 *  get:
 *      summary: Get user information.
 *      description: Get the current authenticated user information
 *      security:
 *          - ApiKeyAuth:
 *              type: apiKey
 *              in: header
 *              name: x-access-token
 *      responses:
 *          200:
 *              description: Successfylly retrieve authenticated user information
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: string
 *                                  example: suwerjfadsf734feBd
 *                              email:
 *                                  type: string
 *                                  example: admin@sejutacita.id
 *          500:
 *              description: Internal server error
 *              
 *  delete:
 *      summary: Delete authenticated user's account.
 *      description: Delete the current authenticated user's account.
 *      security:
 *          - ApiKeyAuth:
 *              type: apiKey
 *              in: header
 *              name: x-access-token
 *      responses:
 *          200:
 *              description: Successfully deleted the account.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: deleted the account
 *          500:
 *              description: Internal server error
 */

/**
 * @swagger
 * /api/user/password:
 *  put:
 *      summary: Update authenticated user's password.
 *      description: Change the authenticated user's password to the new one.
 *      parameters:
 *          - in: body
 *            schema:
 *              type: object
 *              required:
 *                  - password
 *              properties:
 *                  password:
 *                      type: string
 *                      example: SecurePassword2021
 *      security:
 *          - ApiKeyAuth:
 *              type: apiKey
 *              in: header
 *              name: x-access-token
 *      responses:
 *          203:
 *              description: Successfully update user's password
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Password updated successfully
 *          500:
 *              description: Internal server error.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Failed to update password
 */

/**
 * @swagger
 * /api/user/email:
 *  put:
 *      summary: Update authenticated user's email.
 *      description: Change the authenticated user's email to the new one.
 *      parameters:
 *          - in: body
 *            schema:
 *              type: object
 *              required:
 *                  - email
 *              properties:
 *                  email:
 *                      type: string
 *                      example: newemail@gmail.com
 *      security:
 *          - ApiKeyAuth:
 *              type: apiKey
 *              in: header
 *              name: x-access-token
 *      responses:
 *          203:
 *              description: Successfully update user's email
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Email updated successfully
 *          500:
 *              description: Internal server error.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Failed to update email
 */
/**
 * @swagger
 * /api/users:
 *  get:
 *      summary: Return all users in database. [Admin Role Required]
 *      description: Get all users data registered in database.
 *      security:
 *          - ApiKeyAuth:
 *              type: apiKey
 *              in: header
 *              name: x-access-token
 *      responses:
 *          200:
 *              description: Successfully retrieve users collection
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              users:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                  example:
 *                                      [{id: 618acfa689e23e3682ffa5df,
 *                                      email: admin@sejutacita.id,
 *                                      password: $2a$08$JDlfhpdWxsa4FBa6FqfJ2.Owm/CclYFXoOM/YOpBb1GnUK02XKZDS,
 *                                      roles: ["618acd4d77717b3b543a5dcd"],
 *                                      "__v": 1}]
 *          
 */
/**
 * @swagger
 * /api/user/:id:
 *  get:
 *      summary: Return user information by user id [Admin Role Required]
 *      description: Get specific information of a user by their id
 *      security:
 *          - ApiKeyAuth:
 *              type: apiKey
 *              in: header
 *              name: x-access-token
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: User's id
 *      responses:
 *          200:
 *              description: Successfully retrieve user information from database
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: string
 *                                  example: 618acfa689e23e3682ffa5df
 *                              email:
 *                                  type: string
 *                                  example: surya.negara@gontor.ac.id
 *                              password:
 *                                  type: string
 *                                  example: $2a$08$JDlfhpdWxsa4FBa6FqfJ2.Owm/CclYFXoOM/YOpBb1GnUK02XKZDS
 *                              roles:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                  example: [{ "_id": "618acd4d77717b3b543a5dcd","name": "user","__v": 0}]
 *          500:
 *              description: Internal server error
 */
/**
 * @swagger
 * /api/admin/email:
 *  put:
 *      summary: Update user's email by id. [Admin Role Required]
 *      description: Change the user's email to the new one.
 *      parameters:
 *          - in: body
 *            schema:
 *              type: object
 *              required:
 *                  - userId
 *                  - email
 *              properties:
 *                  userId:
 *                      type: string
 *                      example: nldfadsfi234jsdfN
 *                  email:
 *                      type: string
 *                      example: newemail@gmail.com
 *      security:
 *          - ApiKeyAuth:
 *              type: apiKey
 *              in: header
 *              name: x-access-token
 *      responses:
 *          203:
 *              description: Successfully update user's email
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Email updated successfully
 *          500:
 *              description: Internal server error.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Failed to update email
 */
/**
 * @swagger
 * /api/admin/password:
 *  put:
 *      summary: Update user's password by id. [Admin Role Required]
 *      description: Change the selected user's password to the new one.
 *      parameters:
 *          - in: body
 *            schema:
 *              type: object
 *              required:
 *                  - userId
 *                  - password
 *              properties:
 *                  userId:
 *                      type: string
 *                      example: nldfadsfi234jsdfN
 *                  password:
 *                      type: string
 *                      example: NewSecurePassword
 *      security:
 *          - ApiKeyAuth:
 *              type: apiKey
 *              in: header
 *              name: x-access-token
 *      responses:
 *          203:
 *              description: Successfully update user's password
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Password updated successfully
 *          500:
 *              description: Internal server error.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Failed to update password
 */
/**
 * @swagger
 * /api/admin/delete:
 *  delete:
 *      summary: Delete user account [Admin role Required]
 *      security:
 *          - ApiKeyAuth:
 *              type: apiKey
 *              in: header
 *              name: x-access-token
 *      consumes:
 *          - application/json
 *      description: Delete user account by id
 *      parameters:
 *          - in: body
 *            schema:
 *              type: object
 *              required:
 *                  - userId
 *              properties:
 *                  userId:
 *                      type: string
 *                      example: 618acfa689e23e3682ffa5df
 *      responses:
 *          200:
 *              description: Successfully deleted user
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: deleted the account
 *          500:
 *              description: Internal server error
 */


