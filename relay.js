module.exports = function(RED) {

    // "use strict";
    var mapeamentoNode;

    function multipleRelayNA(self, file, slot, currentMode){
        for(var t=0; t<self.qtdRelayNA; t++){
            var command_n={
                type: "relay_modular_V1_0",
                slot: parseInt(mapeamentoNode.slot),
                compare: {},
                method: "set_status_NA",
                relay_number: parseInt(self.relay_number_n[t]),
                relay_value: self.relay_na_value_n[t] ==="true" ? false : true, //logica invertida por conta do hardware
                get_output: {},
            };
            if(!(slot === "begin" || slot === "end")){
                if(currentMode == "test"){
                    file.slots[slot].jig_test.push(command_n);
                }
                else{
                    file.slots[slot].jig_error.push(command_n);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command_n);
                }
                else{
                    file.slots[3].jig_test.push(command_n);
                }
            }
        }
        return file;
    }

    function relayNode(config) {

        RED.nodes.createNode(this, config);
        this.mapeamento = config.mapeamento;
        this.relay_number = config.relay_number;
        mapeamentoNode = RED.nodes.getNode(this.mapeamento);

        this.qtdRelayNA = config.qtdRelayNA;
        this.relay_number_n = []; this.relay_na_value_n = [];
        this.relay_number_n.push(config.relay_number1); this.relay_na_value_n.push(config.relay_na_value1);
        this.relay_number_n.push(config.relay_number2); this.relay_na_value_n.push(config.relay_na_value2);
        this.relay_number_n.push(config.relay_number3); this.relay_na_value_n.push(config.relay_na_value3);
        this.relay_number_n.push(config.relay_number4); this.relay_na_value_n.push(config.relay_na_value4);
        this.relay_number_n.push(config.relay_number5); this.relay_na_value_n.push(config.relay_na_value5);
        this.relay_number_n.push(config.relay_number6); this.relay_na_value_n.push(config.relay_na_value6);
        this.relay_number_n.push(config.relay_number7); this.relay_na_value_n.push(config.relay_na_value7);
        this.relay_number_n.push(config.relay_number8); this.relay_na_value_n.push(config.relay_na_value8);
        this.relay_number_n.push(config.relay_number9); this.relay_na_value_n.push(config.relay_na_value9);
        this.relay_number_n.push(config.relay_number10); this.relay_na_value_n.push(config.relay_na_value10);
        this.relay_number_n.push(config.relay_number11); this.relay_na_value_n.push(config.relay_na_value11);
        this.relay_number_n.push(config.relay_number12); this.relay_na_value_n.push(config.relay_na_value12);
        this.relay_number_n.push(config.relay_number13); this.relay_na_value_n.push(config.relay_na_value13);
        this.relay_number_n.push(config.relay_number14); this.relay_na_value_n.push(config.relay_na_value14);
        this.relay_number_n.push(config.relay_number15); this.relay_na_value_n.push(config.relay_na_value15);
        this.relay_number_n.push(config.relay_number16); this.relay_na_value_n.push(config.relay_na_value16);
        this.relay_number_n.push(config.relay_number17); this.relay_na_value_n.push(config.relay_na_value17);
        this.relay_number_n.push(config.relay_number18); this.relay_na_value_n.push(config.relay_na_value18);
        this.relay_number_n.push(config.relay_number19); this.relay_na_value_n.push(config.relay_na_value19);
        this.relay_number_n.push(config.relay_number20); this.relay_na_value_n.push(config.relay_na_value20);
        this.relay_number_n.push(config.relay_number21); this.relay_na_value_n.push(config.relay_na_value21);
        this.relay_number_n.push(config.relay_number22); this.relay_na_value_n.push(config.relay_na_value22);
        this.relay_number_n.push(config.relay_number23); this.relay_na_value_n.push(config.relay_na_value23);
        this.relay_number_n.push(config.relay_number24); this.relay_na_value_n.push(config.relay_na_value24);

        var node = this;
        var relay_na_value = config.relay_na_value;

        node.on('input', function(msg, send, done) {
            var globalContext = node.context().global;
            var exportMode = globalContext.get("exportMode");
            var currentMode = globalContext.get("currentMode");
            var command = {
                type: "relay_modular_V1_0",
                slot: parseInt(mapeamentoNode.slot),
                compare: {},
                method: "set_status_NA",
                relay_number: parseInt(node.relay_number),
                relay_value: relay_na_value ==="true" ? false : true, //logica invertida por conta do hardware
                get_output: {},
            };
            var file = globalContext.get("exportFile");
            var slot = globalContext.get("slot");
            if(!(slot === "begin" || slot === "end")){
                if(currentMode == "test"){
                    file.slots[slot].jig_test.push(command);
                    file = multipleRelayNA(node, file, slot, currentMode);
                }
                else{
                    file.slots[slot].jig_error.push(command);
                    file = multipleRelayNA(node, file, slot, currentMode);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command);
                    file = multipleRelayNA(node, file, slot, currentMode);
                }
                else{
                    file.slots[3].jig_test.push(command);
                    file = multipleRelayNA(node, file, slot, currentMode);
                }
            }
            globalContext.set("exportFile", file);
            
            send(msg);
        });
    }

    RED.nodes.registerType("relay", relayNode);
};