$(function(){

    let localStream = null;
    let peer = null;
    let existingCall = null;

    let constraints = {
        video: {},
        audio: true
    };
    constraints.video.width = 320;
    constraints.video.height = 240;

    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            $('#myStream').get(0).srcObject = stream;
            localStream = stream;
        }).catch(function (error) {
            console.error('mediaDevice.getUserMedia() error:', error);
            return;
        });

    peer = new Peer({
        key: '166a122f-b9a1-4c1f-a014-a004bda1f5b1',
        debug: 3
    });

    peer.on('open', function(){
        $('#my-id').text(peer.id);
    });

    peer.on('error', function(err){
        alert(err.message);
    });

    $('#make-call').submit(function(e){
        e.preventDefault();
        let roomName = $('#join-room').val();
        if (!roomName) {
            return;
        }
        const　call = peer.joinRoom(roomName, {mode: 'sfu', stream: localStream});
        setupCallEventHandlers(call);
    });

    $('#end-call').click(function(){
        existingCall.close();
    });

    function setupCallEventHandlers(call){
        if (existingCall) {
            existingCall.close();
        };

        existingCall = call;
        setupEndCallUI();
        $('#room-id').text(call.name);

        call.on('stream', function(stream){
            addVideo(stream);
        });

        call.on('peerLeave', function(peerId){
            removeVideo(peerId);
        });

        call.on('close', function(){
            removeAllRemoteVideos();
            setupMakeCallUI();
        });

    }

    function addVideo(stream){
        const videoDom = $('<video autoplay>');
        videoDom.attr('id',stream.peerId);
        videoDom.get(0).srcObject = stream;
        $('.remoteVideosContainer').append(videoDom);
    }

    function removeVideo(peerId){
        $('#'+peerId).remove();
    }

    function removeAllRemoteVideos(){
        $('.remoteVideosContainer').empty();
    }

    function setupMakeCallUI(){
        $('#make-call').show();
        $('#end-call').hide();
    }
    
    function setupEndCallUI() {
        $('#make-call').hide();
        $('#end-call').show();
    }

});