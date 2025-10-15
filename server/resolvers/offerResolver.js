import checkRole from "../middlewares/checkRoleMiddleware.js";
import OfferService from "../services/offerService.js";

export const offerResolver = {
    Query: {

        getAllOffers: async(_, {input}) => {
            try {
                return OfferService.getAll(input);
            } catch(e) {
                return e;
            }
        },

        getOfferById: async(_, {id}) => {
            try {
                return OfferService.getOneByID(id);
            } catch(e) {
                return e;
            }
        }

    },

    Mutation: {

        addOffer: checkRole("CLIENT")(async(_, {input}, {token}) => {
            try {
                return await OfferService.add(input, token);
            } catch(e) {
                return e;
            }
        }),

        changeStatus: checkRole("CLIENT")(async(_, {input}) => {
            try {
                return await OfferService.changeStatus(input);
            } catch(e) {
                return e;
            }
        }),

        deleteOffer: checkRole("CLIENT")(async(_, {id}) => {
            try {
                return await OfferService.remove(id);
            } catch(e) {
                return e;
            }
        })
    }
};