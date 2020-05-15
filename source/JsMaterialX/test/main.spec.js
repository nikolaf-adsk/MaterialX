import { expect } from 'chai';
import regeneratorRuntime from 'regenerator-runtime';
import Module from './_build/MaterialXLib.js';

function initMaterialX() {
    return new Promise(function (resolve) {
        // Note: Module is not a promise.
        // The then function is defined by emscripten.
        Module().then((module) => {
            resolve(module.getMaterialX());
        });
    });
}
describe('Basics', () => {
    let mx, testValues;
    before(async () => {
        mx = await initMaterialX();
        testValues = {
            integer: '1',
            boolean: 'true',
            float: '1.1',
            color2: '0.1, 0.2',
            color3: '0.1, 0.2, 0.3',
            color4: '0.1, 0.2, 0.3, 0.4',
            vector2: '1.1, 2.1',
            vector3: '1.1, 2.1, 3.1',
            vector4: '1.1, 2.1, 3.1, 4.1',
            matrix33: '0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1',
            matrix44: '1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1',
            string: 'value',
            integerarray: '1, 2, 3',
            booleanarray: 'false, true, false',
            floatarray: '1.1, 2.1, 3.1',
            stringarray: "'one', 'two', 'three'",
        };
    });

    it('DataTypes', () => {
        for (let type in testValues) {
            const value = testValues[type];
            const newValue = mx.Value.createValueFromStrings(value, type);
            const typeString = newValue.getTypeString();
            const valueString = newValue.getValueString();
            expect(typeString).to.equal(type);
            expect(valueString).to.equal(value);
        }
    });

    it('Vectors', () => {
        const v1 = new mx.Vector3(1, 2, 3);
        let v2 = new mx.Vector3(2, 4, 6);

        // Indexing operators
        expect(v1.getItem(2)).to.equal(3);

        v1.setItem(2, 4);
        expect(v1.getItem(2)).to.equal(4);
        v1.setItem(2, 3);
        // Component-wise operators
        let res = v2.add(v1);
        expect(res.equals(new mx.Vector3(3, 6, 9))).to.be.true;

        res = v2.sub(v1);
        expect(res.equals(new mx.Vector3(1, 2, 3))).to.be.true;

        res = v2.multiply(v1);
        expect(res.equals(new mx.Vector3(2, 8, 18))).to.be.true;

        res = v2.divide(v1);
        expect(res.equals(new mx.Vector3(2, 2, 2))).to.be.true;

        v2 = v2.add(v1);
        expect(v2.equals(new mx.Vector3(3, 6, 9))).to.be.true;

        v2 = v2.sub(v1);
        expect(v2.equals(new mx.Vector3(2, 4, 6))).to.be.true;

        v2 = v2.multiply(v1);
        expect(v2.equals(new mx.Vector3(2, 8, 18))).to.be.true;

        v2 = v2.divide(v1);
        expect(v2.equals(new mx.Vector3(2, 4, 6))).to.be.true;

        expect(v1.multiply(new mx.Vector3(2, 2, 2)).equals(v2)).to.be.true;
        expect(v2.divide(new mx.Vector3(2, 2, 2)).equals(v1)).to.be.true;

        // Geometric methods
        let v3 = new mx.Vector4(4, 4, 4, 4);
        expect(v3.getMagnitude()).to.equal(8);
        expect(v3.getNormalized().getMagnitude()).to.equal(1);
        expect(v1.dot(v2)).to.equal(28);
        expect(v1.cross(v2).equals(new mx.Vector3())).to.be.true;

        // Vector copy
        const v4 = v2.copy();
        expect(v4.equals(v2)).to.be.true;
        v4.setItem(0, v4.getItem(0) + 1);
        expect(v4.not_equals(v2)).to.be.true;
    });

    function multiplyMatrix(matrix, val) {
        for (let i = 0; i < matrix.numRows(); ++i) {
            for (let k = 0; k < matrix.numColumns(); ++k) {
                const v = matrix.getItem(i, k);
                matrix.setItem(i, k, v * val);
            }
        }
        return matrix;
    }

    function divideMatrix(matrix, val) {
        for (let i = 0; i < matrix.numRows(); ++i) {
            for (let k = 0; k < matrix.numColumns(); ++k) {
                const v = matrix.getItem(i, k);
                matrix.setItem(i, k, v / val);
            }
        }
        return matrix;
    }
    it('Matrices', () => {
        // Translation and scale
        const trans = new mx.Matrix44().createTranslation(new mx.Vector3(1, 2, 3));
        const scale = new mx.Matrix44().createScale(new mx.Vector3(2, 2, 2));
        expect(trans.equals(new mx.Matrix44(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1)));
        expect(scale.equals(new mx.Matrix44(2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1)));

        // Indexing operators
        expect(trans.getItem(3, 2)).to.equal(3);
        trans.setItem(3, 2, 4);
        expect(trans.getItem(3, 2)).to.equal(4);
        trans.setItem(3, 2, 3);

        // Matrix methods
        expect(trans.getTranspose().equals(new mx.Matrix44(1, 0, 0, 1, 0, 1, 0, 2, 0, 0, 1, 3, 0, 0, 0, 1))).to.be.true;
        expect(scale.getTranspose().equals(scale)).to.be.true;
        expect(trans.getDeterminant()).to.equal(1);
        expect(scale.getDeterminant()).to.equal(8);
        expect(trans.getInverse().equals(new mx.Matrix44().createTranslation(new mx.Vector3(-1, -2, -3)))).to.be.true;

        // Matrix product
        const prod1 = trans.multiply(scale);
        const prod2 = scale.multiply(trans);
        const prod3 = multiplyMatrix(trans, 2);
        let prod4 = trans;
        prod4 = prod4.multiply(scale);
        expect(prod1.equals(new mx.Matrix44(2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 2, 4, 6, 1)));
        expect(prod2.equals(new mx.Matrix44(2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 1, 2, 3, 1)));
        expect(prod3.equals(new mx.Matrix44(2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 2, 4, 6, 2)));
        expect(prod4.equals(prod1));

        // Matrix division
        const quot1 = prod1.divide(scale);
        const quot2 = prod2.divide(trans);
        const quot3 = divideMatrix(prod3, 2);
        let quot4 = quot1;
        quot4 = quot4.divide(trans);
        expect(quot1.equals(trans)).to.be.true;
        // debugger;
        // expect(quot2.equals(scale)).to.be.true;
        // expect(quot3.equals(trans)).to.be.true;
        // debugger;
        // expect(quot4 == mx.Matrix44.IDENTITY)

        // // 2D rotation
        // rot1 = mx.Matrix33.createRotation(math.pi / 2)
        // rot2 = mx.Matrix33.createRotation(math.pi)
        // expect((rot1 * rot1).isEquivalent(rot2, _epsilon))
        // expect(rot2.isEquivalent(
        //     mx.Matrix33.createScale(mx.Vector2(-1)), _epsilon))
        // expect((rot2 * rot2).isEquivalent(mx.Matrix33.IDENTITY, _epsilon))

        // // 3D rotation
        // rotX = mx.Matrix44.createRotationX(math.pi)
        // rotY = mx.Matrix44.createRotationY(math.pi)
        // rotZ = mx.Matrix44.createRotationZ(math.pi)
        // expect((rotX * rotY).isEquivalent(
        //     mx.Matrix44.createScale(mx.Vector3(-1, -1, 1)), _epsilon))
        // expect((rotX * rotZ).isEquivalent(
        //     mx.Matrix44.createScale(mx.Vector3(-1, 1, -1)), _epsilon))
        // expect((rotY * rotZ).isEquivalent(
        //     mx.Matrix44.createScale(mx.Vector3(1, -1, -1)), _epsilon))

        // // Matrix copy
        // trans2 = trans.copy()
        // expect(trans2 == trans)
        // trans2[0, 0] += 1;
        // expect(trans2 != trans)
    });

    // it('should say Hello guys!', async () => {

    //     // Create a document.
    //     var doc = mx.createDocument();

    //     // Create elements
    //     const elem1 = doc.addChildOfCategory("generic");
    //     const elem2 = doc.addChildOfCategory("generic");

    //     expect(elem1.getParent()).to.eql(doc);
    //     expect(elem2.getParent()).to.eql(doc);
    //     expect(elem1.getRoot()).to.eql(doc);
    //     expect(elem2.getRoot()).to.eql(doc);
    //     expect(doc.getChildren()[0]).to.eql(elem1);
    //     expect(doc.getChildren()[1]).to.eql(elem2);

    //     // Set hierarchical properties
    //     doc.setFilePrefix("folder/");
    //     doc.setColorSpace("lin_rec709");

    //     expect(elem1.getActiveFilePrefix()).to.equal(doc.getFilePrefix());
    //     expect(elem2.getActiveColorSpace()).to.equal(doc.getColorSpace());

    //     debugger;
    //     // Set typed attributes.
    //     // expect(elem1.getTypedAttribute<bool>("customFlag") == false);
    //     // expect(elem1.getTypedAttribute<mx::Color3>("customColor") == mx::Color3(0.0f));
    //     // elem1.setTypedAttribute<bool>("customFlag", true);
    //     // elem1.setTypedAttribute<mx::Color3>("customColor", mx::Color3(1.0f));
    //     // expect(elem1.getTypedAttribute<bool>("customFlag") == true);
    //     // expect(elem1.getTypedAttribute<mx::Color3>("customColor") == mx::Color3(1.0f));
    //     // expect(elem1.getTypedAttribute<bool>("customColor") == false);
    //     // expect(elem1.getTypedAttribute<mx::Color3>("customFlag") == mx::Color3(0.0f));

    //     // // Modify element names.
    //     // elem1.setName("elem1");
    //     // elem2.setName("elem2");
    //     // expect(elem1.getName() == "elem1");
    //     // expect(elem2.getName() == "elem2");
    //     // expect_THROWS_AS(elem2.setName("elem1"), mx::Exception&);

    //     // // Modify element order.
    //     // mx::DocumentPtr doc2 = doc.copy();
    //     // expect(*doc2 == *doc);
    //     // doc2->setChildIndex("elem1", doc2->getChildIndex("elem2"));
    //     // expect(*doc2 != *doc);
    //     // doc2->setChildIndex("elem1", doc2->getChildIndex("elem2"));
    //     // expect(*doc2 == *doc);
    //     // expect_THROWS_AS(doc2->setChildIndex("elem1", 100), mx::Exception&);
    //     // expect(*doc2 == *doc);

    //     // // Create and test an orphaned element.
    //     // mx::ElementPtr orphan;
    //     // {
    //     //     mx::DocumentPtr doc3 = doc.copy();
    //     //     orphan = doc3->getChild("elem1");
    //     //     expect(orphan);
    //     // }
    //     // expect_THROWS_AS(orphan->getDocument(), mx::ExceptionOrphanedElement&);

    //     expect(true).to.be.true
    // });
});
