
// Uncomment the following to see STDERR of the server
// process.env.NODE_ENV = "dev";

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const mongoose = require("mongoose");
const app = require("./../app");
const Album = require("./../models/album.model");
const Purchase = require("./../models/purchase.model");

chai.use(chaiHttp);

describe("Node CRUD app", function () {
  after(async () => {
    mongoose.connection.close();
  });

  describe("MODELS", function () {
    const createdModels = Object.keys(mongoose.models);

    describe('"Album" model', function () {
      it("should be declared", function () {
        expect(mongoose.models.Album).to.exist;
      });

      describe("should contain fields:", function () {        
        const albumSchema = mongoose.models.Album.schema.paths;

        it("performer: String", function () {
          expect(albumSchema["performer"]).to.exist;
          expect(albumSchema['performer'].instance).to.equal("String");    
        });

        it("title: String", function () {
          expect(albumSchema['title']).to.exist;                   
          expect(albumSchema['title'].instance).to.equal("String");          
        });

        it("cost: Number", function () {
          expect(albumSchema['cost']).to.exist;                   
          expect(albumSchema['cost'].instance).to.equal("Number");          
        });
      });
    });

    describe('"Purchase" model', function () {
      it("should be declared", function () {
        expect(mongoose.models.Purchase).to.exist;
      });

      describe("should contain fields:", function () {
        const purchaseSchema = mongoose.models.Purchase.schema.paths;

        it("shippingAddress: String", function () {
          expect(purchaseSchema['shippingAddress']).to.exist;                   
          expect(purchaseSchema['shippingAddress'].instance).to.equal("String");
        });

        it('album: {  type: ObjectId,  ref: "Album"  } \n \n', function () {          
          expect(purchaseSchema['album']).to.exist;
          expect(purchaseSchema['album'].instance).to.equal("ObjectID");
          expect(purchaseSchema['album'].options.ref).to.equal("Album");
        });
      });
    });
  });

  describe("ROUTES", () => {
    describe("POST /albums", function () {
      it("should create a new Album document in the database", function (done) {
        this.timeout(200);

        chai
          .request(app)
          .post("/albums")
          .send({ title: "Abbey Road", performer: "The Beatles", cost: 20 })
          .end((err, res) => {
            Album.findOne({
              title: "Abbey Road",
              performer: "The Beatles",
              cost: 20,
            })
              .then((createdAlbum) => {
                expect(createdAlbum).to.be.a("object");
                expect(createdAlbum).to.have.property("_id");
                expect(createdAlbum.title).to.equal("Abbey Road");
                expect(createdAlbum.performer).to.equal("The Beatles");
                expect(createdAlbum.cost).to.equal(20);
                done();
              })
              .catch((err) => done(err));
          });
      });

      it("should return a json reponse containing the created document \n \n", function (done) {
        this.timeout(200);
        chai
          .request(app)
          .post("/albums")
          .send({
            title: "Appetite for Destruction",
            performer: "Guns N' Roses",
            cost: 20,
          })
          .end((err, res) => {
            expect(res).to.be.json;
            expect(res.status).to.equal(200);
            expect(res.body.data).to.be.a("object");
            expect(res.body.data).to.have.property("_id");
            expect(res.body.data.title).to.equal("Appetite for Destruction");
            expect(res.body.data.performer).to.equal("Guns N' Roses");
            expect(res.body.data.cost).to.equal(20);
            done();
          });
      });
    });

    describe("GET /albums", function () {
      it("should return a json response containing an array of all albums \n \n", function (done) {
        this.timeout(200);
        chai
          .request(app)
          .get("/albums")
          .end((err, res) => {
            expect(res).to.be.json;
            expect(res.status).to.equal(200);
            expect(res.body.data).to.be.a("array");
            expect(res.body.data.length).to.equal(2);
            expect(res.body.data[0].title).to.equal("Abbey Road");
            expect(res.body.data[0].cost).to.equal(20);
            expect(res.body.data[0]).to.have.property("_id");
            done();
          });
      });
    });

    describe("GET /albums/:id", function () {
      it("should return a json response with a specific album \n \n", function (done) {
        this.timeout(200);
        Album.findOne()
          .then((album) => {
            chai
              .request(app)
              .get(`/albums/${album._id}`)
              .end((err, res) => {
                expect(res).to.be.json;
                expect(res.status).to.equal(200);
                expect(res.body.data).to.be.a("object");
                expect(res.body.data._id).to.equal(album._id.toString());
                expect(res.body.data.cost).to.equal(album.cost);
                expect(res.body.data.title).to.equal(album.title);
                expect(res.body.data.performer).to.deep.equal(album.performer);
                done();
              });
          })
          .catch((err) => done(err));
      });
    });

    describe("POST /albums/:id", function () {
      it("should update the properties of a specific album document", function (done) {
        this.timeout(200);
        Album.findOne()
          .then((album) => {
            console.log(album);
            chai
              .request(app)
              .post(`/albums/${album._id}`)
              .send({
                performer: "Amy Winehouse",
                title: "Back to Black",
                cost: 25,
              })
              .end((err, res) => {
                 Album.findById(album._id)
                   .then((album) => {
                      expect(album._id.toString()).to.equal(album._id.toString());
                      expect(album.title).to.equal("Back to Black");
                      expect(album.performer).to.equal("Amy Winehouse");
                      expect(album.cost).to.equal(25);
                      done();
                   })
              });
          })
          .catch((err) => done(err));
      });

      it("should return a json response with the updated album document \n \n", function (done) {
        this.timeout(200);
        Album.findOne()
          .then(function (album) {
            chai
              .request(app)
              .post(`/albums/${album._id}`)
              .send({ performer: "Daft Punk", title: "Discovery", cost: 30 })
              .end((err, res) => {
                expect(res).to.be.json;
                expect(res.status).to.equal(200);
                expect(res.body.data).to.be.a("object");
                expect(res.body.data._id).to.equal(album._id.toString());
                expect(res.body.data.title).to.equal("Discovery");
                expect(res.body.data.performer).to.equal("Daft Punk");
                expect(res.body.data.cost).to.equal(30);
                done();
              });
          })
          .catch((err) => done(err));
      });
    });

    describe("POST /albums/:id/delete", function () {
      it("should delete the document from the database", function (done) {
        this.timeout(200);
        Album.findOne()
          .then((album) => {
            chai
              .request(app)
              .post(`/albums/${album._id}/delete`)
              .end((err, res) => {
                Album.countDocuments()
                  .then((count) => {
                    expect(count).to.equal(1);
                    done();
                  })
                  .catch((err) => done(err));
              });
          })
          .catch((err) => done(err));
      });

      it("should return a response with status 204 \n \n", function (done) {
        this.timeout(200);
        Album.findOne()
          .then((album) => {
            chai
              .request(app)
              .post(`/albums/${album._id}/delete`)
              .end((err, res) => {
                expect(res.status).to.equal(204);
                done();
              });
          })
          .catch((err) => done(err));
      });
    });

    describe("POST /purchases", function () {
      it("should create a new purchase document", function (done) {
        this.timeout(200);
        Purchase.deleteMany()
          .then(() => {
            new Album({
              title: "The People in Nassau",
              performer: "Blue Mitchell",
              cost: 2 
            })
              .save(function (err, album) {
                chai
                  .request(app)
                  .post("/purchases")
                  .send({ shippingAddress: "123 Ave. 1234", album: album })
                  .end((err, res) => {
                    Purchase.findOne()
                      .then((purchase) => {
                        expect(purchase.shippingAddress).to.equal("123 Ave. 1234");
                        expect(purchase.album.toString()).to.equal(album._id.toString());
                        done();
                      })
                      .catch((err) => done(err));
                   })
                });
          })
      });
      
      
      
      it("should return a json reponse containing the created document \n \n", function (done) {
        this.timeout(200);
        
        Album.create({
          title: "Piel Canela",
          performer: "Cuco",
          cost: 5
        })
        .then((album) => {
          chai
            .request(app)
            .post("/purchases")
            .send({ shippingAddress: "Gran Via 987", album: album })
            .end((err, res) => {
              expect(res).to.be.json;
              expect(res.status).to.equal(200);
              expect(res.body.data).to.be.a("object");
              expect(res.body.data).to.have.property("_id");
              expect(res.body.data.shippingAddress).to.equal("Gran Via 987");
              expect(res.body.data.album).to.be.a("string");
              expect(res.body.data.album.toString()).to.equal(album._id.toString());                 
              done();
            });
        })
        .catch((err) => done(err));
      });
      
    });

    describe("GET /purchases/:purchaseId", function () {      

      it("should return a json response containing the populated purchase document", function (done) {
        this.timeout(200);
        const ERROR_MSG = "you should use `.populate` to swap the reference id for a Album document\n\n";

        Album.create({
          title: "HOP",
          performer: "Brendan Eder E.",
          cost: 2,
        })
        .then((album) => Purchase.create({ shippingAddress: "456 Str. 789", album: album._id}))
        .then((purchase) => {
          const albumId = purchase.album;
          console.log('CREATED purchase', purchase)
          chai
            .request(app)
            .get(`/purchases/${purchase._id}`)
            .end((err, res) => {
              console.log('RES', res)
              expect(res).to.be.json;
              expect(res.status).to.equal(200);
              expect(res.body.data._id.toString()).to.equal(purchase._id.toString());            
              expect(res.body.data.shippingAddress).to.equal("456 Str. 789");              
              expect(res.body.data.album).to.be.an("object", ERROR_MSG);
              expect(res.body.data.album._id).to.equal(albumId.toString());
              expect(res.body.data.album.title).to.equal("HOP");
              expect(res.body.data.album.performer).to.equal("Brendan Eder E.");
              done(); 
            });
        });
      });
    });
  });
});
