class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        // Get the transformation matrix from the TRS object
        const transformationMatrix = this.trs.getTransformationMatrix();

        const transformedMvp = MatrixMult(mvp, transformationMatrix);
        const transformedModelView = MatrixMult(modelView, transformationMatrix);
        const transformedNormals = MatrixMult(normalMatrix, transformationMatrix);
        const transformedModel = MatrixMult(modelMatrix, transformationMatrix);

        // Draw the mesh
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
        
        // Draw the children
        for (const child of this.children) {
            child.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
    }
}
