import { toyService } from '../services/toy.service.js'

export const toyStore = {
    state: {
        toys: null,
        filterBy: {
            searchStr: '',
            status: 'All',
            type: 'All',
            sortBy: 'Name'
        },
        pageSize: 4,
        pageIdx: 0
    },
    getters: {
        toysForDisplay(state) {
            if (!state.toys) return
            const startIdx = state.pageIdx * state.pageSize;
            const toys = state.toys.slice(startIdx, startIdx + state.pageSize)
            return toys
        },
        // toysForChart(state) {
        //     return state.toys
        // },
        // avgs(state) {
        //     return state.avgs
        // },
        sumToysByType(state) {
            if (!state.toys) return
            var typesSum = state.toys.reduce((acc, toy) => {
                if (!acc[toy.type]) acc[toy.type] = 1
                acc[toy.type]++
                return acc
            }, {})
            return typesSum
        },
        getToysAvgPrice(state) {
            if (!state.toys) return
                var toysPriceAvgs = state.toys.reduce(
                    (acc, toy) => {
                        if (!acc[toy.type]) acc[toy.type] = [];
                        acc[toy.type].push(toy.price);
                        return acc;
                    },
                    {}
                );
                for (const type in toysPriceAvgs) {
                    let typePrices = toysPriceAvgs[type];
                var pricesSum = typePrices.reduce((acc, price) => {
                    return acc + price;
                }, 0);
                toysPriceAvgs[type] = pricesSum / typePrices.length;
            }
            return toysPriceAvgs
        },
    },
    mutations: {
        setToys(state, { toys }) {
            state.toys = toys
        },
        removeToy(state, { toyId }) {
            const idx = state.toys.findIndex(toy => toy._id === toyId)
            state.toys.splice(idx, 1)
        },
        setToy(state, { savedToy }) {
            const idx = state.toys.findIndex(toy => toy._id === savedToy._id)
            if (idx === -1) {
                state.toys.unshift(savedToy)
            } else {
                state.toys.splice(idx, 1, savedToy)
            }
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy

        },
        setPage(state, { pageIdx }) {
            console.log('pageIdx:', pageIdx)
            state.pageIdx = pageIdx
        }
    },
    actions: {
        loadToys(context) {
            return toyService.query(context.state.filterBy)
                .then(toys => {
                    context.commit({ type: 'setToys', toys })
                })
                .catch(err => {
                    console.log('Store: Cannot load toys', err);
                    throw new Error('Cannot load Toys');
                })
        },
        removeToy(context, payload) {
            return toyService.remove(payload.toyId)
                .then(() => {
                    context.commit(payload)
                })
                .catch(err => {
                    console.log('Store: Cannot remove toy', err);
                    throw new Error('Cannot remove toy');
                })
        },
        setToy(context, { savedToy }) {
            return toyService.save(savedToy)
                .then(savedToy => {
                    context.commit({ type: 'setToy', savedToy })
                    return savedToy
                })
                .catch(err => {
                    console.log('Store: Cannot save toy', err);
                    throw new Error('Cannot save toy');
                })
        },
        getToy(context, { toyId }) {
            return toyService.getById(toyId)
        },
    },
}