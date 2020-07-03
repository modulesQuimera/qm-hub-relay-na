module.exports = function(RED) {

    "use strict";
    var mapeamentoNode;

    function relayNode(config) {

        RED.nodes.createNode(this, config);
        this.mapeamento = config.mapeamento
        this.relay_number = config.relay_number

        mapeamentoNode = RED.nodes.getNode(this.mapeamento)

        var node = this
        var relay_na_value = config.relay_na_value


        node.on('input', function(msg, send, done) {

            // substitua a variavel msg pela a informação desejada a ser passada via serial
            var globalContext = node.context().global;
            var exportMode = globalContext.get("exportMode");
            var currentMode = globalContext.get("currentMode");
            var command = {
                "type": "relay_modular_V1.0",
                "slot": 1,
                "compare": {},
                "method": "set_status_NA",
                "relay_number": parseInt(node.relay_number),
                "relay_value": relay_na_value
            }
            var file = globalContext.get("exportFile")
            var slot = globalContext.get("slot");
            if(currentMode == "test"){file.slots[slot].jig_test.push(command)}
            else{file.slots[slot].jig_error.push(command)}
            globalContext.set("exportFile", file);
            // node.status({fill:"green", shape:"dot", text:"done"}); // seta o status pra waiting
            
            send(msg)
            console.log(file)
        });
        // var nodeDaVariavel = config.NodeDaVariavel

    }

    // nome do modulo
    RED.nodes.registerType("relay", relayNode);

    RED.httpAdmin.get("/statusNA", function(req, res) {
        console.log(mapeamentoNode)
        if (mapeamentoNode) {
            res.json([
                { value: mapeamentoNode.valuePort1, label: "NA1 | CM1 - " + mapeamentoNode.labelPort1, hasValue: false },
                { value: mapeamentoNode.valuePort2, label: "NA2 | CM2 - " + mapeamentoNode.labelPort2, hasValue: false },
                { value: mapeamentoNode.valuePort3, label: "NA3 | CM3 - " + mapeamentoNode.labelPort3, hasValue: false },
                { value: mapeamentoNode.valuePort4, label: "NA4 | CM4 - " + mapeamentoNode.labelPort4, hasValue: false },
                { value: mapeamentoNode.valuePort5, label: "NA5 | CM5 - " + mapeamentoNode.labelPort5, hasValue: false },
                { value: mapeamentoNode.valuePort6, label: "NA6 | CM6 - " + mapeamentoNode.labelPort6, hasValue: false },
                { value: mapeamentoNode.valuePort7, label: "NA7 | CM7 - " + mapeamentoNode.labelPort7, hasValue: false },
                { value: mapeamentoNode.valuePort8, label: "NA8 | CM8 - " + mapeamentoNode.labelPort8, hasValue: false },
            ])
        } else {
            res.json([
                { label: "NA1 | CM1", value: "0", hasValue: false },
                { label: "NA2 | CM2", value: "1", hasValue: false },
                { label: "NA3 | CM3", value: "2", hasValue: false },
                { label: "NA4 | CM4", value: "3", hasValue: false },
                { label: "NA5 | CM5", value: "5", hasValue: false },
                { label: "NA6 | CM6", value: "6", hasValue: false },
                { label: "NA7 | CM7", value: "7", hasValue: false },
                { label: "NA8 | CM8", value: "8", hasValue: false },
            ])
        }
    });
}